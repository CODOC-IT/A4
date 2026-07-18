import { promises as fs } from "node:fs";
import { buildBooking } from "./bookingService";
import path from "node:path";
import { BookingStatus, CreateBookingInput } from "./types";
const filePath = path.join(process.cwd(), "data", "bookings.json");
export async function listBookings(): Promise<any[]> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (e) {
    return [];
  }
}
export async function getBooking(id: string) {
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  return data.find((x: any) => x.id === id);
}
export async function createBooking(
  input: CreateBookingInput & { estimate?: number },
) {
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  const booking = buildBooking(input);
  
  data.push(booking);
 await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return booking;
}
export async function updateStatus(id: string, status: BookingStatus) {
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  const item = data.find((x: any) => x.id === id);
 if (!item) throw new Error("missing");
  item.status = status;
 fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return item;
}
