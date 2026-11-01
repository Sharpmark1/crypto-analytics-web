import type {
  HistoricalPoint,
  DailyReturnPoint,
} from "../types/crypto"

export function calculateDailyReturns(
  history: HistoricalPoint[]
): DailyReturnPoint[] {
  return history.map((point, index) => {
    const previousPoint = history[index - 1]

    const dailyReturn =
      !previousPoint || previousPoint.price === 0
        ? null
        : ((point.price - previousPoint.price) /
            previousPoint.price) * 100

    return {
      ...point,
      dailyReturn,
    }
  })
}

export type ReturnStats = {
  highest: number
  lowest: number
  average: number
  returnPercent: number
}

export function calculateReturnStats(
  history: HistoricalPoint[]
): ReturnStats {
  const prices = history.map((point) => point.price)

  if (prices.length === 0) {
    return {
      highest: 0,
      lowest: 0,
      average: 0,
      returnPercent: 0,
    }
  }

  const firstPrice = prices[0]
  const lastPrice = prices[prices.length - 1]

  return {
    highest: Math.max(...prices),
    lowest: Math.min(...prices),
    average:
      prices.reduce((sum, price) => sum + price, 0) /
      prices.length,
    returnPercent:
      firstPrice !== 0
        ? ((lastPrice - firstPrice) / firstPrice) * 100
        : 0,
  }
}