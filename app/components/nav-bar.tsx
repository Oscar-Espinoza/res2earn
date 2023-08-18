'use client'

import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import { MdOutlineGeneratingTokens } from 'react-icons/md'

export default function NavBar() {

  return (
    <header className="px-8 py-3 border-b bg-white flex justify-center">
      <div className="flex justify-between max-w-lg grow">
        <Link href='/' className="flex items-center gap-1 text-xl">
          <MdOutlineGeneratingTokens size={30} />
          <p className="font-bold font-mono">Res2earN</p>
        </Link>

        <nav className='flex items-center gap-10'>
          <Web3Button />
        </nav>
      </div>
    </header>
  )
}