import './globals.css'
import LayoutWrapper from './components/LayoutWrapper'
import 'aos/dist/aos.css'

export const metadata = {
  title: 'Smart School System',
  description: 'Modern Smart School Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}