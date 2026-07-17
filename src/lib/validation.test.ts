import { describe, expect, it } from "vitest";
import { validateBooking } from "./validation";
const validInput = { customerName: "Test", email: "a@b.com", serviceType: "Cleaning", durationHours: 2, urgency: "standard" };
describe("validateBooking", () => {
  it("returns data with no errors for valid input", () => {
    const result = validateBooking(validInput);
    expect(result.data).toBeDefined();
    expect(result.errors).toBeUndefined();
  });
  it("rejects missing customerName", () => {
    const result = validateBooking({ ...validInput, customerName: "" });
    expect(result.errors?.customerName).toBeDefined();
  });
  it("rejects missing email", () => {
    const result = validateBooking({ ...validInput, email: "" });
    expect(result.errors?.email).toBeDefined();
  });
  it("rejects invalid email format", () => {
    const result = validateBooking({ ...validInput, email: "not-an-email" });
    expect(result.errors?.email).toBeDefined();
  });
  it("rejects invalid serviceType", () => {
    const result = validateBooking({ ...validInput, serviceType: "RocketScience" });
    expect(result.errors?.serviceType).toBeDefined();
  });
  it("rejects negative duration", () => {
    const result = validateBooking({ ...validInput, durationHours: -1 });
    expect(result.errors?.durationHours).toBeDefined();
  });
  it("rejects zero duration", () => {
    const result = validateBooking({ ...validInput, durationHours: 0 });
    expect(result.errors?.durationHours).toBeDefined();
  });
  it("rejects invalid urgency", () => {
    const result = validateBooking({ ...validInput, urgency: "super-urgent" });
    expect(result.errors?.urgency).toBeDefined();
  });
  it("rejects phone longer than 20 chars", () => {
    const result = validateBooking({ ...validInput, phone: "1".repeat(21) });
    expect(result.errors?.phone).toBeDefined();
  });
});
