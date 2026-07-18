import { CreateBookingInput } from "./types";

export function validateBooking(value: any): {
  data?: CreateBookingInput;
  errors?: Record<string, string>;
} {
  if (!value.customerName) {
    return {
      errors: {
        customerName: "Required",
      },
    };
  }

  return { data: value };
}

const allowedStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export function validateStatus(status: any) {
  if (
    typeof status !== "string" ||
    !allowedStatuses.includes(status as (typeof allowedStatuses)[number])
  ) {
    return {
      errors: [
        {
          field: "status",
          message:
            "Status must be one of: pending, confirmed, completed, cancelled.",
        },
      ],
    };
  }

  return { data: status };
}