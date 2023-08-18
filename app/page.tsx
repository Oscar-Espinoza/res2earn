'use client'

import { useState } from 'react';
import { useAccount } from 'wagmi';
import TokenBalance from './components/TokenBalance';
import { quizTokenAddress } from './_constants';
import Surveys from './components/Surveys';
import { Code } from '@nextui-org/react';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { isConnected, address } = useAccount({
    onConnect() {
      setLoading(false)
    }
  })
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-5 py-3 max-w-lg'>
        {!isConnected || loading
          ?
          <div className='px-4 w-full'>
            <Code color="primary" className='font-semibold text-base w-full text-center'>Connect and start collecting $QUIZ tokens!</Code>
          </div>
          :
          <TokenBalance address={address} tokenAddress={quizTokenAddress} />
        }
        <Surveys />
      </div>
    </div>
  )
}
