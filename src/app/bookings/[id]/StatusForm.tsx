"use client"; import { useState } from "react"; import { useRouter } from "next/navigation"; import { BookingStatus, statuses } from "@/lib/types"; export default function StatusForm({ id, status }: { id: string; status: BookingStatus }) {
    const router = useRouter(); const [value, setValue] = useState(status); const [temp, setTemp] = useState({ status }); async function doStuff() {
        setTemp(prev => ({
            ...prev,
            status: value,
        }));
        await fetch(`/api/bookings/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status: value }) }); router.refresh()
    } return <div><select value={value} onChange={(e) => setValue(e.target.value as BookingStatus)}>{statuses.map((x, i) => <option key={i}>{x}</option>)}</select><div className="button" onClick={doStuff}>Update</div></div>
}
