'use client'

import { useAccount } from 'wagmi';
import TokenBalance from './components/TokenBalance';
import { quizTokenAddress } from './_constants';
import Surveys from './components/Surveys';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { isConnected, address } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      setLoading(false)
      console.log('Connected', { address, connector, isReconnected })
    }
  })
  return (
    <div className='px-4 py-20 flex flex-col gap-10'>
      {(isConnected && !loading) && <TokenBalance address={address} tokenAddress={quizTokenAddress} />}
      <Surveys />
    </div>
  )
}
