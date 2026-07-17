import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookingRow from "./BookingRow";
import type { Booking } from "@/lib/types";

const booking: Booking = {
  id: "1",
  customerName: "Harbour Books",
  email: "harbour@example.com",
  phone: "555-1234",
  serviceType: "Cleaning",
  durationHours: 2,
  urgency: "standard",
  status: "pending",
  estimate: 100,
  assignee: null,
  notes: "",
  createdAt: "2024-01-01T00:00:00.000Z",
};

describe("booking row", () => {
  it("shows the customer name and current estimate", () => {
    render(
      <table>
        <tbody>
          <BookingRow booking={booking} />
        </tbody>
      </table>
    );
    const row = screen.getByTestId("booking-row");
    expect(row.textContent).toContain("Harbour Books");
    expect(row.textContent).toContain("€100");
  });
});