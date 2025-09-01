import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"], 
  variable: "--font-geist-mono",
})

export const metadata = {
  title: 'Stationary Web',
  description: 'Menyediakan penyimpanan data anda dengan lengkap dengan kualitas yang terjangkau',
}

// Tambahkan export viewport yang terpisah
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
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