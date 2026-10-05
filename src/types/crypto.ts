export type CoinId =
  "bitcoin" | "ethereum" | "solana" | "sui"

export type Prices = {
  market_caps: [number, number]
  prices: [number, number]
  total_volume: [number, number]
}

export type CryptoData = {
  usd: number
  usd_24h_change: number
}

export type Coin = {
  title: string
  id: CoinId
}

export type CryptoPrices = Record<CoinId, CryptoData>

export type HistoricalPoint = {
  date: string
  price: number
}

export type DailyReturnPoint = HistoricalPoint & {
  dailyReturn: number | null
}

export type RawHistoricalPoint = {
  timestamp: number
  price: number
}