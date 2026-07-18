import { CreateBookingInput } from "./types";

export function validateBooking(value: any): {
  data?: CreateBookingInput;
  errors?: {
    field: string;
    message: string;
  }[];
} {
  const errors: { field: string; message: string }[] = [];

  if (!value.customerName) {
    errors.push({
      field: "customerName",
      message: "Customer name is required",
    });
  }

  if (!value.email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  }

  if (errors.length > 0) {
    return { errors };
  }

  return { data: value };
}
