import { CreateBookingInput } from "./types";
export function validateBooking(value: Partial<CreateBookingInput>): {
  data?: CreateBookingInput;
  errors?: Record<string, string>;
} {
  if (!value.customerName) return { errors: { customerName: "Required" } };
  return { data: value as CreateBookingInput };
}
