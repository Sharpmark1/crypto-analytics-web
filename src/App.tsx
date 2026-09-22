import { useState, useEffect } from "react"
import KPICard from "./components/KPICard"
import { getCoinHistory, getCryptoPrices } from "./api/client"
import PriceChart from "./components/PriceChart"
import type {
  CoinId,
  CryptoPrices,
  RawHistoricalPoint,
  HistoricalPoint,
  DailyReturnPoint
} from "./types/crypto"

  const coins: {title : string, id : CoinId}[] = [
  { title: "BTC", id: "bitcoin" },
  { title: "ETH", id: "ethereum" },
  { title: "SOL", id: "solana" },
  { title: "SUI", id: "sui" }
]

const currencyFormatter = new Intl.NumberFormat("en-US", {
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

    

    const formattedTrueHighest = currencyFormatter.format(highest)
    const formattedTrueLowest = currencyFormatter.format(lowest)
    const formattedAverage = currencyFormatter.format(average)
    const formattedReturn = returnPercent >= 0 
    ? `+${returnPercent.toFixed(2)}%` 
    : `${returnPercent.toFixed(2)}%`


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
        const grouped = rawHistoryData.reduce((acc, point) => {
          const date = new Date(point.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit"
          })
          if(!acc[date]) {
            acc[date] = []
          }
          acc[date].push(point.price)
          return acc 
        }, {})

        
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
        
        {coins.map((coin) => (
          <button 
            key={coin.id}
            onClick={() => 
              setSelectedCoin(coin.id)
              }
            className= {
              selectedCoin === coin.id ? "active-btn" : "coin-btn"
            }
            >
            {coin.title}
          </button>))}

{prices === null ? (
  <p>Loading price...</p>
  ) : 
  (
    <section className="selected-coin">
      <div className="selected-header">
        <span>Selected Coin</span>
        <h2>{selected?.title}</h2>
      </div>

      <div className="selected-metrics">
        <div>
          <span>Current Price: </span>
          <strong>
            {currencyFormatter.format(prices[selectedCoin].usd)}
          </strong>
        </div>

        <div>
          <span>24h Change: </span>
          <strong>
            {prices[selectedCoin].usd_24h_change >= 0
              ? `+${prices[selectedCoin].usd_24h_change.toFixed(2)}%`
              : `${prices[selectedCoin].usd_24h_change.toFixed(2)}%`
            }
          </strong>
        </div>
      </div>
    </section>
  )
}


{prices === null ? (<p>Loading prices</p>) : (
  <div>

    <section>
      <h2 className="section-title">Market Snapshot</h2>
      <div className="kpi-grid">
        {coins.map((coin) => {  
          const change = prices[coin.id].usd_24h_change 
          return (
            <KPICard
            key={coin.id}
            title={coin.title}
            value={currencyFormatter.format(prices[coin.id].usd)} 
            change = { change >= 0 
              ? `+${change.toFixed(2)}%` : 
              `${change.toFixed(2)}%` }
            />
            )
          })}
      </div>
    </section>

    <section>
      <h2 className="section-title">Historical Analytics</h2>

      {historyLoading ? (
        <p>Loading historical data...</p>
      ) : (
        <div className="kpi-grid">
          <KPICard
            title="30D High"
            value={formattedTrueHighest}
          />

          <KPICard
            title="30D Low"
            value={formattedTrueLowest}
          />

          <KPICard
            title="30D Average"
            value={formattedAverage}
          />

          <KPICard
            title="30D Return"
            value={formattedReturn}
          />
        </div>
      )}
    </section>
  </div>)}

    {historyLoading ? (
      <div className="chart-card">
        <h2>Price History</h2>
        <p>Loading chart...</p>
      </div>
    ) : (
      dailyHistory.length > 0 && (
    <PriceChart data={dailyHistory} />
  )
)}

        
      </main>
    )
  }

export default App