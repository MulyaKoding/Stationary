import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stationary',
  description: 'Why we should provide stationary app?',
}

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="homepage-container">
          {children}
        </div>
      </body>
    </html>
  )
}   