import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blogger's Blog",
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-black container min-h-screen max-w-full `} style={{background:'white'}}>{children}</body>
    </html>
  )
}
