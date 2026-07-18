import { validateBooking } from "@/lib/validation";
import { NextResponse } from "next/server";
import { getBooking, updateStatus } from "@/lib/store";
import { validateStatus } from "@/lib/validation";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const booking = await getBooking(id);

  if (!booking) {
    return NextResponse.json(null);
  }

  if (booking.status === "pending") {
    await updateStatus(id, "confirmed");
  }

  return NextResponse.json({ booking });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
    return NextResponse.json(
      { error: "failed" },
      { status: 404 },
    );
  }
}
