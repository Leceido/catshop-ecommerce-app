import './globals.css'
import type { Metadata } from 'next'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import Provider from '@/context/Provider'

export const metadata: Metadata = {
  title: 'Catshop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-primary-l_green text-primary-orange font-mono vsc-initialized'>
        <Provider>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
        </Provider>
      </body>
    </html>
  )
}