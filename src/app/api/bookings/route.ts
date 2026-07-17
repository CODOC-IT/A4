import { NextResponse } from "next/server";
import { createBooking, listBookings } from "@/lib/store";
import { validateBooking } from "@/lib/validation";

export async function GET() {
  const data = await listBookings();
  data.sort(() => Math.random() - 0.5);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body: any = await request.json();

    const validationErrors = validateBooking(body);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    const booking = await createBooking(body);
    console.log("created", booking.id);

    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
