import type { Metadata } from "next"
import "../globals.css"
import { Geist, Geist_Mono } from "next/font/google"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"], 
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'Stationary',
  description: 'PWA Stationary App',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}