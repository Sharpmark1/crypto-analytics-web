import type {
  CoinId,
  CryptoPrices,
  HistoryRange
 } from "../types/crypto"

export async function getCryptoPrices(): Promise<CryptoPrices> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,sui,chainlink,avalanche-2,dogecoin,cardano,ripple,binancecoin&vs_currencies=usd&include_24hr_change=true"

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
  coinId: CoinId,
  days: HistoryRange = 30
): Promise<CoinHistoryResponse> {
  const url =
  `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const data: CoinHistoryResponse = await response.json()

  return data
}