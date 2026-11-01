import { describe, expect, it } from "vitest"
import {
  calculateDailyReturns,
  calculateReturnStats,
} from "./analytics"
import type { HistoricalPoint } from "../types/crypto"

describe("calculateDailyReturns", () => {
  it("calculates percentage changes between consecutive prices", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 100 },
      { date: "Oct 02", price: 110 },
      { date: "Oct 03", price: 99 },
    ]

    expect(calculateDailyReturns(history)).toEqual([
      { date: "Oct 01", price: 100, dailyReturn: null },
      { date: "Oct 02", price: 110, dailyReturn: 10 },
      { date: "Oct 03", price: 99, dailyReturn: -10 },
    ])
  })

  it("returns an empty array for empty history", () => {
    expect(calculateDailyReturns([])).toEqual([])
  })

  it("returns null when there is no previous price", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 100 },
    ]

    expect(calculateDailyReturns(history)).toEqual([
      { date: "Oct 01", price: 100, dailyReturn: null },
    ])
  })

  it("avoids division by zero when the previous price is zero", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 0 },
      { date: "Oct 02", price: 50 },
    ]

    const result = calculateDailyReturns(history)

    expect(result[1].dailyReturn).toBeNull()
  })
})

describe("calculateReturnStats", () => {
  it("calculates high, low, average, and overall return", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 100 },
      { date: "Oct 02", price: 110 },
      { date: "Oct 03", price: 90 },
    ]

    expect(calculateReturnStats(history)).toEqual({
      highest: 110,
      lowest: 90,
      average: 100,
      returnPercent: -10,
    })
  })

  it("returns zero values for empty history", () => {
    expect(calculateReturnStats([])).toEqual({
      highest: 0,
      lowest: 0,
      average: 0,
      returnPercent: 0,
    })
  })

  it("handles a single price point", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 120 },
    ]

    expect(calculateReturnStats(history)).toEqual({
      highest: 120,
      lowest: 120,
      average: 120,
      returnPercent: 0,
    })
  })

  it("avoids division by zero when the starting price is zero", () => {
    const history: HistoricalPoint[] = [
      { date: "Oct 01", price: 0 },
      { date: "Oct 02", price: 10 },
    ]

    expect(calculateReturnStats(history).returnPercent).toBe(0)
  })
})