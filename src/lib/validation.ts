import {
  CreateBookingInput,
  serviceTypes,
  urgencies,
} from "./types";

export function validateBooking(value: any): {
  data?: CreateBookingInput;
  errors?: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Customer name
  if (!value.customerName?.trim()) {
    errors.customerName = "Customer name is required";
  } else if (value.customerName.length > 100) {
    errors.customerName = "Customer name must not exceed 100 characters";
  }

  // Email
  if (!value.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    errors.email = "Invalid email format";
  }

  // Phone
  if (!value.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(value.phone)) {
    errors.phone = "Invalid phone number";
  }

  // Service type
  if (!serviceTypes.includes(value.serviceType)) {
    errors.serviceType = "Invalid service type";
  }

  // Duration
  if (
    typeof value.durationHours !== "number" ||
    value.durationHours <= 0
  ) {
    errors.durationHours = "Duration must be greater than 0";
  }

  // Urgency
  if (!urgencies.includes(value.urgency)) {
    errors.urgency = "Invalid urgency";
  }

  // Notes
  if (value.notes && value.notes.length > 500) {
    errors.notes = "Notes must not exceed 500 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { data: value };
}