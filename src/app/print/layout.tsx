import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Print Resume - ResumeFlow',
}

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
