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
    const body = await request.json();

    const validation = validateStatus(body.status);

    if (validation.errors) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors,
        },
        { status: 404 },
      );
    }

    const booking = await updateStatus(
      (await params).id,
      validation.data!,
    );

    return NextResponse.json(
      { data: booking },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "failed" },
      { status: 404 },
    );
  }
}
