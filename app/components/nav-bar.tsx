'use client'

import { Web3Button } from "@web3modal/react";
import { useNetwork } from "wagmi";

export default function NavBar() {
  const net = useNetwork()
  return (
    <header className="px-8 py-3 border-b bg-white flex justify-between items-center">
      <div className="flex gap-2 cursor-pointer">
        Icon
        <p>res2earn</p>
      </div>

      <nav className='flex items-center gap-10'>
        <Web3Button />
      </nav>
    </header>
  )
}