"use client";

import { FormEvent } from "react";
import { ServiceType, Urgency } from "@/lib/types";

export interface BookingFormViewProps {
  service: ServiceType;
  urgency: Urgency;
  hours: number;
  setService: (service: ServiceType) => void;
  setUrgency: (urgency: Urgency) => void;
  setHours: (hours: number) => void;
  estimate: number;
  saving: boolean;
  error: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function BookingFormView({
  service,
  urgency,
  hours,
  setService,
  setUrgency,
  setHours,
  estimate,
  saving,
  error,
  onSubmit,
}: BookingFormViewProps) {
  return (
    <form className="panel" onSubmit={onSubmit}>
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
