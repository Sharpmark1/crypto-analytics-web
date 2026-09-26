import { useState, useEffect } from "react"
import HistoricalAnalytics from "./components/HistoricalAnalytics"
import { getCoinHistory, getCryptoPrices } from "./api/client"
import PriceChart from "./components/PriceChart"
import CoinSelector from "./components/CoinSelector"
import type { Coin } from "./components/CoinSelector"
import SelectedCoin from "./components/SelectedCoin"
import MarketSnapshot from "./components/MarketSnapshot"
import type {
  CoinId,
  CryptoPrices,
  RawHistoricalPoint,
  HistoricalPoint,
  DailyReturnPoint
} from "./types/crypto"

const coins: Coin[] = [
  { title: "BTC", id: "bitcoin" },
  { title: "ETH", id: "ethereum" },
  { title: "SOL", id: "solana" },
  { title: "SUI", id: "sui" }
]

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})


  function App() {
    const [selectedCoin, setSelectedCoin] = useState<CoinId>("bitcoin")
    const [prices, setPrices] = useState<CryptoPrices|null>(null)
    const selected = coins.find((coin) => coin.id === selectedCoin)
    const [dailyHistory, setDailyHistory] = useState<HistoricalPoint[]>([])
    const [rawHistory, setRawHistory] = useState<RawHistoricalPoint[]>([])
    const [historyLoading, setHistoryLoading] = useState(true)

    const highest =
      rawHistory.length > 0
      ? rawHistory.reduce((max, point) =>
        point.price > max ? point.price : max,
        rawHistory[0].price)
        : 0

    const lowest = 
      rawHistory.length > 0 
      ? rawHistory.reduce((min, point) =>
      point.price < min ? point.price : min,
      rawHistory[0].price)
      : 0

    const total = dailyHistory.reduce((sum, point) => {
      return sum + point.price }, 0 )

    const average = dailyHistory.length > 0 
      ? total / dailyHistory.length : 0
    
    const firstPrice = dailyHistory.length > 0
      ? dailyHistory[0].price : 0

    const lastPrice = dailyHistory.length > 0
    ? dailyHistory[dailyHistory.length -1].price : 0

    const returnPercent = dailyHistory.length > 0
      ? ((lastPrice - firstPrice) / firstPrice) * 100
      : 0
    
    const dailyReturns: DailyReturnPoint[] = dailyHistory.map((point, index) => {
      if (index === 0) {
        return {
          date: point.date,
          price: point.price,
          dailyReturn: null
        }
      }

      const currentPrice = point.price
      const previousPrice = dailyHistory[index - 1].price

      const returnValue =
        ((currentPrice - previousPrice) / previousPrice) * 100

        return {
          date: point.date,
          price: point.price,
          dailyReturn: returnValue
        }
      })

    useEffect(() => {

      setHistoryLoading(true)
      setDailyHistory([])
      setRawHistory([])

      getCoinHistory(selectedCoin)
      .then((data) => {
        const rawHistoryData = data.prices.map((point) => {
          return {
            timestamp: point[0],
            price: point[1]
          }
        })
        const grouped = rawHistoryData.reduce<Record<string, number[]>>(
          (acc, point) => {
            const date = new Date(point.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit"
            })

            const pricesForDate = acc[date] ?? []

            pricesForDate.push(point.price)

            acc[date] = pricesForDate

            return acc
          },
          {}
          )

        
        const dailyHistory = Object.entries(grouped).map(([date, price]) => {
          return {
            date,
            price: price[price.length - 1]
          }
        })
        setRawHistory(rawHistoryData)
        setDailyHistory(dailyHistory)
        setHistoryLoading(false)
      })
      .catch((error) => {
        console.error("History API error:", error)
        setHistoryLoading(false)
      })},[selectedCoin])
    
    useEffect(() => {
      getCryptoPrices()
      .then((data) => {
        setPrices(data)
      })
      .catch((error) => {
        console.error("Crypto API error:", error)
      })
    }, [])

    return (
      <main>
        <h1>Crypto Market Analytics</h1>
        
        <CoinSelector
          coins={coins}
          selectedCoin={selectedCoin}
          onSelect={setSelectedCoin}
        />
{prices === null || selected === undefined ? (
  <p>Loading price...</p>
  ) : 
  (
    <SelectedCoin 
      selected= {selected}
      price={prices[selectedCoin].usd}
      change={prices[selectedCoin].usd_24h_change}
    />
    )
}
{historyLoading ? (
    <div className="chart-card">
      <h2>Price History</h2>
      <p>Loading chart...</p>
    </div>
  ) : (
    dailyHistory.length > 0 && (
      <PriceChart data={dailyHistory} />
    )
  )
}


{prices === null ? (<p>Loading prices</p>) : (
  <div>

    <MarketSnapshot 
      coins={coins}
      prices={prices}
    />
    {historyLoading ? 
    (<p>Loading historical data...</p>)
    : (<HistoricalAnalytics
        high30D={highest}
        low30D={lowest}
        average30D={average}
        return30D={returnPercent}
      />
    )}
  </div>)}
</main>
    )
  }

export default App