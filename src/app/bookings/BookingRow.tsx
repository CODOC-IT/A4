import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Booking } from "@/lib/types";

export default function BookingRow({ booking }: { booking: Booking }) {
  return (
    <tr data-testid="booking-row">
      <td>
        <Link href={`/bookings/${booking.id}`}>{booking.customerName}</Link>
      </td>
      <td>{booking.serviceType}</td>
      <td>
        <span className={`status ${booking.status}`}>{booking.status}</span>
      </td>
      <td>{formatDate(booking.createdAt)}</td>
      <td>{formatCurrency(booking.estimate)}</td>
    </tr>
  );
}