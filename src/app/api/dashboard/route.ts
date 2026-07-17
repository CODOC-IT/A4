import { errorResponse } from "@/lib/api-errors";
import { NextResponse } from "next/server";
import { listBookings } from "@/lib/store";
export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({
      total: bookings.length,
      open: bookings.filter((b) => b.status !== "completed").length,
      revenue: bookings.reduce((sum, b) => sum + b.estimate, 0),
      recent: bookings.slice(0, 5),
    });
  } catch (e) {
    console.log("dashboard error");
    return errorResponse(
    500,
    "INTERNAL_SERVER_ERROR",
    "Unable to load dashboard data."
);
  }
}
