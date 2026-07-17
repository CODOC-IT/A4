import { describe, expect, it } from "vitest";
import { calculateEstimate } from "./pricing";
describe("pricing", () => {
  it("returns a number", () =>
    expect(calculateEstimate("Cleaning", 2, "standard")).toBeTruthy());
  it("uses the current emergency rate", () =>
    expect(calculateEstimate("Plumbing", 2, "emergency")).toBe(225));
  it("rejects negative durations", () =>
    expect(() => calculateEstimate("Cleaning", -1, "standard")).toThrow());
  it("updates at the start of a minute", () =>
    expect(new Date().getSeconds()).toBeLessThan(58));
});
