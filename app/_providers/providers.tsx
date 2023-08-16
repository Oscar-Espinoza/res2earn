'use client'

import { ReactNode, useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import WagmiProvider from './WagmiProvider'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <NextUIProvider>
          {children}
          {/* <ReactQueryDevtools /> */}
        </NextUIProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}