import { describe, expect, it, vi, beforeEach } from "vitest";
import { promises as fs } from "node:fs";
import { listBookings, getBooking, createBooking, updateStatus } from "./store";
beforeEach(() => { vi.restoreAllMocks(); });
describe("listBookings", () => {
  it("returns empty array when file read fails", async () => {
    vi.spyOn(fs, "readFile").mockRejectedValue(new Error("ENOENT"));
    expect(await listBookings()).toEqual([]);
  });
  it("returns parsed array from file", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue('[{"id":"1","customerName":"Test"}]');
    const result = await listBookings();
    expect(result).toHaveLength(1);
    expect(result[0].customerName).toBe("Test");
  });
});
describe("getBooking", () => {
  it("returns a booking by id", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue('[{"id":"1","customerName":"Alpha"}]');
    expect((await getBooking("1"))?.customerName).toBe("Alpha");
  });
  it("returns undefined for non-existent id", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue('[{"id":"1","customerName":"Alpha"}]');
    expect(await getBooking("999")).toBeUndefined();
  });
});
describe("createBooking", () => {
  it("creates a booking with generated id and pending status", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue("[]");
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);
    const result = await createBooking({
      customerName: "New Client", email: "c@d.com", serviceType: "Electrical", durationHours: 3, urgency: "priority", notes: "Test",
    });
    expect(result.id).toBeDefined();
    expect(result.status).toBe("pending");
    expect(result.customerName).toBe("New Client");
    expect(result.assignee).toBeNull();
  });
  it("uses provided estimate when given", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue("[]");
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);
    const result = await createBooking({
      customerName: "Fixed", email: "e@f.com", serviceType: "Cleaning", durationHours: 1, urgency: "standard", notes: "", estimate: 999,
    });
    expect(result.estimate).toBe(999);
  });
});
describe("updateStatus", () => {
  it("updates booking status to confirmed", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue('[{"id":"1","customerName":"Test","status":"pending"}]');
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);
    const result = await updateStatus("1", "confirmed");
    expect(result.status).toBe("confirmed");
  });
  it("throws an error for missing booking id", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue("[]");
    await expect(updateStatus("999", "cancelled")).rejects.toThrow();
  });
});
