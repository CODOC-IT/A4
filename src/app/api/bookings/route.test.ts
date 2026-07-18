import { describe, expect, it, vi, beforeEach } from "vitest";
vi.mock("@/lib/store", () => ({ listBookings: vi.fn(), createBooking: vi.fn() }));
import { listBookings, createBooking } from "@/lib/store";
import { GET, POST } from "./route";

beforeEach(() => { vi.clearAllMocks(); });

describe("GET /api/bookings", () => {
  it("returns 200 with booking array", async () => {
    vi.mocked(listBookings).mockResolvedValue([{ id: "1", customerName: "Test" }]);
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
  });
  it("returns empty array when no bookings exist", async () => {
    vi.mocked(listBookings).mockResolvedValue([]);
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual([]);
  });
});

describe("POST /api/bookings", () => {
  it("returns 200 with created booking for valid input", async () => {
    vi.mocked(createBooking).mockResolvedValue({ id: "abc", customerName: "New" });
    const request = new Request("http://localhost:3000/api/bookings", {
      method: "POST",
      body: JSON.stringify({ customerName: "New", email: "a@b.com", serviceType: "Cleaning", durationHours: 2, urgency: "standard" }),
      headers: { "content-type": "application/json" },
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toBe("abc");
  });
  it("returns 200 with error when customerName is missing", async () => {
    const request = new Request("http://localhost:3000/api/bookings", {
      method: "POST",
      body: JSON.stringify({ email: "a@b.com" }),
      headers: { "content-type": "application/json" },
    });
    const response = await POST(request);
    const data = await response.json();
    expect(data.message).toBe("bad");
  });
  it("returns 500 when body is invalid JSON", async () => {
    const request = new Request("http://localhost:3000/api/bookings", {
      method: "POST",
      body: "not-json",
      headers: { "content-type": "application/json" },
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
  });
});
