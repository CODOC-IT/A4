import { CreateBookingInput, serviceTypes, urgencies } from "./types";
export function validateBooking(value: any): {
  data?: CreateBookingInput;
  errors?: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!value.customerName || typeof value.customerName !== "string" || value.customerName.trim().length === 0)
    errors.customerName = "Customer name is required";
  else if (value.customerName.length > 100)
    errors.customerName = "Customer name must be 100 characters or less";
  if (!value.email || typeof value.email !== "string") errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = "Invalid email format";
  if (value.phone != null && typeof value.phone === "string" && value.phone.length > 20)
    errors.phone = "Phone must be 20 characters or less";
  if (!serviceTypes.includes(value.serviceType)) errors.serviceType = "Invalid service type";
  const hours = Number(value.durationHours);
  if (isNaN(hours) || hours <= 0 || hours > 168) errors.durationHours = "Duration must be between 1 and 168 hours";
  if (!urgencies.includes(value.urgency)) errors.urgency = "Invalid urgency level";
  if (Object.keys(errors).length > 0) return { errors };
  return { data: value as CreateBookingInput };
}
