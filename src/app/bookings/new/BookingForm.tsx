"use client";

import { FormEvent, useMemo, useState } from "react";
import { calculateEstimate } from "@/lib/pricing";
import { ServiceType, Urgency } from "@/lib/types";
import { useCreateBooking } from "./useCreateBooking";
import { BookingFormView } from "./BookingFormView";

export default function BookingForm() {
  const [service, setService] = useState<ServiceType>("Cleaning");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [hours, setHours] = useState(2);

  const { saving, error, createBooking } = useCreateBooking();

  const estimate = useMemo(
    () => calculateEstimate(service, hours, urgency),
    [service, hours, urgency]
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));
    createBooking(body, estimate);
  }

  return (
    <BookingFormView
      service={service}
      urgency={urgency}
      hours={hours}
      setService={setService}
      setUrgency={setUrgency}
      setHours={setHours}
      estimate={estimate}
      saving={saving}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}