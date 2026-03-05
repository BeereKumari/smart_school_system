import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import 'aos/dist/aos.css'

export const metadata = {
  title: 'Smart School System',
  description: 'Modern Smart School Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}