import type React from "react"
import type { Metadata } from "next"
import { Luckiest_Guy } from "next/font/google"
import "./globals.css"

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "BUGE - The Goodest Boy on Base",
  description: "BUGE is a digital pug born on Base Network. Join the meme revolution!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={luckiestGuy.className}>{children}</body>
    </html>
  )
}
