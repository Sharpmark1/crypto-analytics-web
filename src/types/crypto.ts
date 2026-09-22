export type CoinId =
  "bitcoin" | "ethereum" | "solana" | "sui"

export type CryptoData = {
  usd: number
  usd_24h_change: number
}

export type CryptoPrices = Record<CoinId, CryptoData>

export type HistoricalPoint = {
  date: string
  price: number
}

export type DailyReturnPoint = HistoricalPoint & {
  dailyReturn: number
}

export type RawHistoricalPoint = {
  timestamp: number
  price: number
}