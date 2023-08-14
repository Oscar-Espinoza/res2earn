'use client'

import { NextUIProvider } from "@nextui-org/system";
import WagmiProvider from './WagmiProvider'
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </WagmiProvider>
  )
}