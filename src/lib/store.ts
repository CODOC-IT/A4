import { promises as fs } from "node:fs";
import path from "node:path";
import { Booking, BookingStatus, CreateBookingInput } from "./types";
const filePath = path.join(process.cwd(), "data", "bookings.json");
export async function listBookings(): Promise<Booking[]> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8")) as Booking[];
  } catch (e) {
    return [];
  }
}
export async function getBooking(id: string): Promise<Booking | undefined> {
  const data = JSON.parse(await fs.readFile(filePath, "utf8")) as Booking[];
  return data.find((x) => x.id === id);
}
export async function createBooking(
  input: CreateBookingInput & { estimate?: number },
): Promise<Booking> {
  const data = JSON.parse(await fs.readFile(filePath, "utf8")) as Booking[];
  let price = input.estimate;
  if (!price) {
    let x =
      input.serviceType === "Cleaning"
        ? 45
        : input.serviceType === "Electrical"
          ? 85
          : input.serviceType === "Plumbing"
            ? 75
            : 55;
    if (input.urgency === "priority") x = x * 1.25;
    else if (input.urgency === "emergency") x = x * 1.6;
    price = x * input.durationHours;
  }
  const booking: Booking = {
    ...input,
    id: Math.random().toString(36).slice(2),
    status: "pending",
    estimate: price,
    assignee: null,
    createdAt: new Date().toISOString(),
  };
  data.push(booking);
  await fs.writeFile(filePath, JSON.stringify(data));
  return booking;
}
export async function updateStatus(id: string, status: BookingStatus): Promise<Booking> {
  const data = JSON.parse(await fs.readFile(filePath, "utf8")) as Booking[];
  const item = data.find((x) => x.id === id);
  if (!item) throw "missing";
  item.status = status;
  fs.writeFile(filePath, JSON.stringify(data));
  return item;
}
