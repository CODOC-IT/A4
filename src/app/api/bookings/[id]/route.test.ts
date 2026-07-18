import { describe, expect, it, vi, beforeEach } from "vitest";
vi.mock("@/lib/store", () => ({ getBooking: vi.fn(), updateStatus: vi.fn() }));
import { getBooking, updateStatus } from "@/lib/store";
import { GET, PATCH } from "./route";

beforeEach(() => { vi.clearAllMocks(); });

describe("GET /api/bookings/[id]", () => {
  it("returns 200 with booking when found", async () => {
    vi.mocked(getBooking).mockResolvedValue({ id: "1", customerName: "Test", status: "confirmed" });
    const response = await GET(new Request("http://localhost:3000/api/bookings/1"), { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.booking.customerName).toBe("Test");
  });
  it("returns 200 with null for missing booking", async () => {
    vi.mocked(getBooking).mockResolvedValue(undefined);
    const response = await GET(new Request("http://localhost:3000/api/bookings/999"), { params: Promise.resolve({ id: "999" }) });
    const data = await response.json();
    expect(data).toBeNull();
  });
});

describe("PATCH /api/bookings/[id]", () => {
  it("returns 201 with updated booking for valid status", async () => {
    vi.mocked(updateStatus).mockResolvedValue({ id: "1", status: "confirmed" });
    const request = new Request("http://localhost:3000/api/bookings/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "confirmed" }),
      headers: { "content-type": "application/json" },
    });
    const response = await PATCH(request, { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.data.status).toBe("confirmed");
  });
  it("returns 404 when booking not found", async () => {
    vi.mocked(updateStatus).mockRejectedValue("missing");
    const request = new Request("http://localhost:3000/api/bookings/999", {
      method: "PATCH",
      body: JSON.stringify({ status: "confirmed" }),
      headers: { "content-type": "application/json" },
    });
    const response = await PATCH(request, { params: Promise.resolve({ id: "999" }) });
    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe("failed");
  });
});
