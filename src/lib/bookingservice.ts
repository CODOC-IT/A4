import { randomUUID } from "node:crypto";
import { CreateBookingInput } from "./types";
import { calculateEstimate } from "./pricing";

export function buildBooking(
  input: CreateBookingInput & { estimate?: number },
) {
  const estimate =
    input.estimate ??
    calculateEstimate(
      input.serviceType,
      input.durationHours,
      input.urgency,
    );

  return {
    ...input,
    id: randomUUID(),
    status: "pending",
    estimate,
    assignee: null,
    createdAt: new Date().toISOString(),
  };
}