import './globals.css'

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