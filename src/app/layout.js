import './globals.css'

export const metadata = {
  title: 'Foodie-WAYS | Order Prioritization',
  description: 'Premium dashboard for food delivery order prioritization using a Max-Heap Priority Queue',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
