import { promises as fs } from "node:fs";
import path from "node:path";
import { Booking, BookingStatus, CreateBookingInput } from "./types";
const filePath = path.join(process.cwd(), "data", "bookings.json");

async function readBookings(): Promise<Booking[]> {
  return JSON.parse(await fs.readFile(filePath, "utf8")) as Booking[];
}

async function saveBookings(bookings: Booking[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(bookings));
}

function calculateBookingPrice(
  input: CreateBookingInput & { estimate?: number },
): number {
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
  return price;
}

function buildBooking(
  input: CreateBookingInput & { estimate?: number },
  price: number,
): Booking {
  return {
    ...input,
    id: Math.random().toString(36).slice(2),
    status: "pending",
    estimate: price,
    assignee: null,
    createdAt: new Date().toISOString(),
  };
}

export async function listBookings(): Promise<Booking[]> {
  try {
    return await readBookings();
  } catch (e) {
    return [];
  }
}
export async function getBooking(id: string): Promise<Booking | undefined> {
  const data = await readBookings();
  return data.find((x) => x.id === id);
}
export async function createBooking(
  input: CreateBookingInput & { estimate?: number },
): Promise<Booking> {
  const data = await readBookings();
  const price = calculateBookingPrice(input);
  const booking: Booking = buildBooking(input, price);
  data.push(booking);
  await saveBookings(data);
  return booking;
}
export async function updateStatus(id: string, status: BookingStatus): Promise<Booking> {
  const data = await readBookings();
  const item = data.find((x) => x.id === id);
  if (!item) throw "missing";
  item.status = status;
  saveBookings(data);
  return item;
}
