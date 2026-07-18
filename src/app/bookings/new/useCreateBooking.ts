"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useCreateBooking() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function createBooking(body: Record<string, any>, estimate: number) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, estimate }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push(`/bookings/${data.id}`);
        return;
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to create booking. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return {
    saving,
    error,
    createBooking,
  };
}
