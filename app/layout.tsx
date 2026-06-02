import type { Metadata } from 'next'
import { Nunito, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
})
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'FinQuest - Platform Gamifikasi Keuangan SMP',
  description:
    'Platform gamifikasi edukasi keuangan untuk siswa SMP. Simulasi pengelolaan uang saku, misi keuangan, dan tantangan pengambilan keputusan finansial.',
  keywords: ['gamifikasi', 'keuangan', 'SMP', 'literasi keuangan', 'uang saku'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className={`${nunito.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
