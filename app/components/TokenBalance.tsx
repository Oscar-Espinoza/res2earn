import React from 'react'
import { useBalance } from 'wagmi'

type TokenBalanceProps = {
  address?: `0x${string}`
  tokenAddress?: `0x${string}`
}


function TokenBalance({ address, tokenAddress }: TokenBalanceProps) {
  const { data: balance, isError, isLoading } = useBalance({
    address,
    token: tokenAddress,
  })

  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>

  return (
    <div>Your {balance?.symbol} balance: {balance?.formatted}</div>
  )
}

export default TokenBalance