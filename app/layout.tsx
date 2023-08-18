import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from "./_providers/providers"
import './styles/globals.css'
import NavBar from './components/nav-bar'
import Footer from './components/footer'

import { LayoutProps } from './types/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Res2earn',
  description: 'Fill your survey and start earning crypto',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
