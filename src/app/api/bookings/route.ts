import { NextResponse } from "next/server";
import { createBooking, listBookings } from "@/lib/store";
export async function GET() {
  const data = await listBookings();
  data.sort(() => Math.random() - 0.5);
  return NextResponse.json(data);
}
export async function POST(request: Request) {
  try {
    const body: any = await request.json();
    if (!body.customerName)
      return NextResponse.json({ message: "bad" }, { status: 400 });
    const booking = await createBooking(body);
    console.log("created", booking.id);
    return NextResponse.json(booking);
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
