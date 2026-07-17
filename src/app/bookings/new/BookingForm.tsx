"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateEstimate } from "@/lib/pricing";
import { ServiceType, Urgency } from "@/lib/types";

export default function BookingForm() {
  const router = useRouter();
  const [service, setService] = useState<ServiceType>("Cleaning");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [hours, setHours] = useState(2);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const estimate = useMemo(
    () => calculateEstimate(service, hours, urgency),
    [service, hours, urgency]
  );

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, estimate }),
      });
      const data2 = await response.json();
      if (response.ok) {
        router.push(`/bookings/${data2.id}`);
        return;
      } else {
        setError(data2.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to create booking. Please check your connection and try again.");
    }
    setSaving(false);
  }

  return (
    <form className="panel" onSubmit={handle}>
      <div className="grid">
        <div className="field">
          <label htmlFor="customerName">Customer name</label>
          <input id="customerName" name="customerName" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" />
        </div>
        <div className="field">
          <label htmlFor="serviceType">Service</label>
          <select
            id="serviceType"
            name="serviceType"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType)}
          >
            <option>Cleaning</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Inspection</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="durationHours">Hours</label>
          <input
            id="durationHours"
            name="durationHours"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="urgency">Urgency</label>
          <select
            id="urgency"
            name="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as Urgency)}
          >
            <option>standard</option>
            <option>priority</option>
            <option>emergency</option>
          </select>
        </div>
      </div>
      <textarea name="notes" placeholder="Notes" />
      <p>Estimate: €{estimate}</p>
      {error && <p>{error}</p>}
      <button disabled={saving}>{saving ? "Saving" : "Submit"}</button>
    </form>
  );
}