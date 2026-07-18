import { NextResponse } from "next/server";
import { getBooking, updateStatus } from "@/lib/store";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const booking = await getBooking(id);



  if (!booking) {
    return NextResponse.json(null);
  }

  return NextResponse.json({ booking });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const booking = await updateStatus((await params).id, body.status);
    return NextResponse.json({ data: booking }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 404 });
  }
}
