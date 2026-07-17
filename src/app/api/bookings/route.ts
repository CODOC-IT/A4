import { validateBooking } from "@/lib/validation";
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
    const validation = validateBooking(body);

if (validation.errors) {
  return NextResponse.json(
    {
      error: "Validation failed",
      details: validation.errors,
    },
    { status: 400 }
  );
}

const booking = await createBooking(validation.data!);
    console.log("created", booking.id);
   return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
