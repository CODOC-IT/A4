import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate } from "./format";
describe("formatCurrency", () => {
  it("formats whole euros with two decimals", () =>
    expect(formatCurrency(100)).toBe("€100.00"));
  it("formats cents correctly", () =>
    expect(formatCurrency(99.5)).toBe("€99.50"));
  it("formats zero", () =>
    expect(formatCurrency(0)).toBe("€0.00"));
  it("formats large numbers with thousand separators", () =>
    expect(formatCurrency(1234567.89)).toBe("€1,234,567.89"));
  it("handles single digit values", () =>
    expect(formatCurrency(5)).toBe("€5.00"));
});
describe("formatDate", () => {
  it("formats full ISO date string", () =>
    expect(formatDate("2026-07-12T10:30:00.000Z")).toBe("12 Jul 2026"));
  it("formats date-only string", () =>
    expect(formatDate("2026-01-05")).toBe("5 Jan 2026"));
  it("handles end of year", () =>
    expect(formatDate("2026-12-31")).toBe("31 Dec 2026"));
});
