import { describe, expect, it, vi, beforeEach } from "vitest";
vi.mock("@/lib/store", () => ({ listBookings: vi.fn() }));
import { listBookings } from "@/lib/store";
import { GET } from "./route";

beforeEach(() => { vi.clearAllMocks(); });

describe("GET /api/dashboard", () => {
  it("returns dashboard stats with total, open, revenue, recent", async () => {
    vi.mocked(listBookings).mockResolvedValue([
      { id: "1", status: "completed", estimate: 200 },
      { id: "2", status: "in-progress", estimate: 150 },
      { id: "3", status: "pending", estimate: 100 },
    ]);
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.total).toBe(3);
    expect(data.open).toBe(2);
    expect(data.revenue).toBe(450);
    expect(data.recent).toHaveLength(3);
  });
  it("returns empty stats when listBookings fails", async () => {
    vi.mocked(listBookings).mockRejectedValue(new Error("db error"));
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({});
  });
  it("returns empty stats when no bookings exist", async () => {
    vi.mocked(listBookings).mockResolvedValue([]);
    const response = await GET();
    const data = await response.json();
    expect(data.total).toBe(0);
    expect(data.open).toBe(0);
    expect(data.revenue).toBe(0);
    expect(data.recent).toHaveLength(0);
  });
});
