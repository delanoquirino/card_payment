"use client"
import { GlobalStyle } from "@/styles/global"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  )
}
