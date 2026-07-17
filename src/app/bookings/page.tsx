import Link from "next/link";
import { listBookings } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/status_badge";

export default async function Bookings({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const p = await searchParams;
  const all = await listBookings();
  const q = (p.q ?? "").toLowerCase();
  const bookings = all.filter(
    (b) =>
      (!q ||
        b.customerName.toLowerCase().includes(q) ||
        b.serviceType.toLowerCase().includes(q)) &&
      (!p.status || b.status === p.status)
  );

  return (
    <>
      <div className="titleRow">
        <h1>Bookings</h1>
        <Link className="button" href="/bookings/new">
          Create booking
        </Link>
      </div>
      <form className="panel grid">
        <div className="field">
          <label htmlFor="q">Search</label>
          <input id="q" name="q" defaultValue={p.q} placeholder="Customer or service" />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={p.status ?? ""}>
            <option value="">All statuses</option>
            <option>pending</option>
            <option>confirmed</option>
            <option>in-progress</option>
            <option>completed</option>
            <option>cancelled</option>
          </select>
        </div>
        <button>Apply filters</button>
      </form>
      {bookings.length === 0 ? (
        <p className="empty">No bookings match these filters.</p>
      ) : (
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Created</th>
                <th>Estimate</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <Link href={`/bookings/${b.id}`}>{b.customerName}</Link>
                  </td>
                  <td>{b.serviceType}</td>
                  <td>
                    <StatusBadge value={b.status} />
                  </td>
                  <td>{formatDate(b.createdAt)}</td>
                  <td>{formatCurrency(b.estimate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}