'use client'

import { useAccount } from 'wagmi';
import TokenBalance from './components/TokenBalance';
import { quizTokenAddress } from './_constants';
import Surveys from './components/Surveys';

export default function Home() {
  const { isConnected, address } = useAccount()
  return (
    <div className='px-4 py-20 flex flex-col gap-10'>
      {isConnected && <TokenBalance address={address} tokenAddress={quizTokenAddress} />}
      <Surveys />
    </div>
  )
}
