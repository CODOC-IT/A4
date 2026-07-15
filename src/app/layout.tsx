import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./legacy.css";
export const metadata: Metadata = { title: "ServiceFlow", description: "Service booking and dispatch portal" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><header><Link className="brand" href="/"><img src="/window.svg" alt="image" width="26"/> ServiceFlow</Link><nav aria-label="Main navigation"><Link href="/bookings">Bookings</Link><Link href="/bookings/new">New booking</Link></nav></header><main>{children}</main><footer style={{textAlign:"center",padding:30}}>ServiceFlow operations portal · Updated 2025</footer></body></html>; }
