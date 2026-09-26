import type { CoinId, CryptoPrices } from "../types/crypto"

export async function getCryptoPrices(): Promise<CryptoPrices> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,sui&vs_currencies=usd&include_24hr_change=true"

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const data: CryptoPrices = await response.json()

  return data
}

type CoinHistoryResponse = {
  prices: [number, number][]
}

export async function getCoinHistory(
  coinId: CoinId
): Promise<CoinHistoryResponse> {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const data: CoinHistoryResponse = await response.json()

  return data
}