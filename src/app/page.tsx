import Link from "next/link";
import { listBookings } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/status_badge";
import SummaryCard from "@/components/SummaryCard";

export default async function Dashboard() {
  const data2 = await listBookings();
  const active = data2.filter(
    (b) => !["completed", "cancelled"].includes(b.status)
  ).length;
  const revenue = data2
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.estimate, 0);

  return (
    <>
      <div className="titleRow">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="button" href="/bookings/new">
              Create booking
        </Link>
      </div>
      <section className="cards">
        <SummaryCard label="Total bookings" value={data2.length} />
        <SummaryCard label="Active jobs" value={active} />
        <SummaryCard label="Completed revenue" value={`${revenue.toFixed(2)} EUR`} />
      </section>
      <section>
        <div className="titleRow">
          <h2>Recent bookings</h2>
          <Link href="/bookings">View all</Link>
        </div>
        {data2.length === 0 ? (
          <p>Nothing here</p>
        ) : (
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Estimate</th>
                </tr>
              </thead>
              <tbody>
                {data2.slice(0, 5).map((b, x) => (
                  <tr key={x}>
                    <td>
                      <Link href={`/bookings/${b.id}`}>{b.customerName}</Link>
                    </td>
                    <td>{b.serviceType}</td>
                    <td>
                      <StatusBadge value={b.status} />
                    </td>
                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td>€{b.estimate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
