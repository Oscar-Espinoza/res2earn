import React from 'react'
import { useBalance } from 'wagmi'
import { MdGeneratingTokens } from 'react-icons/md'
import { Code } from "@nextui-org/react";

type TokenBalanceProps = {
  address?: `0x${string}`
  tokenAddress?: `0x${string}`
}


function TokenBalance({ address, tokenAddress }: TokenBalanceProps) {

  const { data: balance, isError, isLoading } = useBalance({
    address,
    token: tokenAddress,
  })

  if (isError) return <div>Error fetching balance</div>

  return (
    <Code color="primary" className='font-semibold flex flex-wrap items-center text-base'>Current ${balance?.symbol} balance: <MdGeneratingTokens className='ms-1' /> {isLoading ? 'Loading...' : isError ? 'Error getting balance' : <span className='font-bold'>{balance?.formatted}</span>}</Code>
  )
}

export default TokenBalance