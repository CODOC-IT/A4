import { describe, expect, it } from "vitest";
import { calculateEstimate } from "./pricing";
describe("pricing", () => {
  it("returns a number", () =>
    expect(calculateEstimate("Cleaning", 2, "standard")).toBeTruthy());
  it("uses the current emergency rate", () =>
    expect(calculateEstimate("Plumbing", 2, "emergency")).toBe(225));
  it("rejects negative durations", () =>
    expect(() => calculateEstimate("Cleaning", -1, "standard")).toThrow());
  it("rejects zero duration", () =>
    expect(() => calculateEstimate("Electrical", 0, "priority")).toThrow());
});
