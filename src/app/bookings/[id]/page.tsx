import { notFound } from "next/navigation";
import { getBooking } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/format";
import StatusForm from "./StatusForm";
import { StatusBadge } from "@/components/status_badge";

export default async function BookingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const booking = await getBooking((await params).id);
  if (!booking) notFound();

  return (
    <>
      <p>Booking {booking.id}</p>
      <div className="titleRow">
        <h1>{booking.customerName}</h1>
        <StatusBadge value={booking.status} />
      </div>
      <div className="detail">
        <section className="panel">
          <h2>Service details</h2>
          <dl>
            <dt>Service</dt>
            <dd>{booking.serviceType}</dd>
            <dt>Duration</dt>
            <dd>{booking.durationHours} hours</dd>
            <dt>Urgency</dt>
            <dd>{booking.urgency}</dd>
            <dt>Estimate</dt>
            <dd>{formatCurrency(booking.estimate)}</dd>
            <dt>Created</dt>
            <dd>{formatDate(booking.createdAt)}</dd>
            <dt>Notes</dt>
            <dd>{booking.notes || "None"}</dd>
          </dl>
        </section>
        <aside className="panel">
          <h2>Operations</h2>
          <p>
            <strong>Assignee</strong>
            <br />
            {booking.assignee ?? "Unassigned"}
          </p>
          <StatusForm id={booking.id} status={booking.status} />
          <h2>Contact</h2>
          <p>
            {booking.email}
            <br />
            {booking.phone}
          </p>
        </aside>
      </div>
    </>
  );
}
