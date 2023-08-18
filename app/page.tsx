'use client'

import { useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import TokenBalance from './components/TokenBalance';
import { quizTokenAddress } from './_constants';
import Surveys from './components/Surveys';
import { Button, Code } from '@nextui-org/react';
import { mainNetwork } from './_constants';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { isConnected, address } = useAccount({
    onConnect() {
      setLoading(false)
    }
  })

  const network = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-5 py-3 max-w-lg'>
        {!isConnected || loading
          ?
          <div className='px-2 xs:px-4 w-full'>
            <Code color="primary" className='font-semibold w-full text-center text-sm xs:text-base'>Connect and start collecting $QUIZ tokens!</Code>
          </div>
          :
          <div className='px-2 xs:px-4 flex flex-col gap-3'>
            <TokenBalance address={address} tokenAddress={quizTokenAddress} />
            {(isConnected && network.chain?.network !== mainNetwork.name && <Code color='danger' className='w-full flex items-center gap-5 py-1'>You are not in goerli network! <Button color='danger' onClick={() => switchNetwork?.(mainNetwork.id)}>Switch to goerli</Button></Code>)}
          </div>
        }
        <Surveys />
      </div>
    </div>
  )
}
