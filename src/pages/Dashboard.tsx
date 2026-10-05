import { useState, useEffect } from "react"
import useCoinHistory from "../hooks/useCoinHistory"
import { getCryptoPrices } from "../api/client"
import type {
  Coin,
  CoinId,
  CryptoPrices
} from "../types/crypto"

import PriceChart from "../components/PriceChart"
import HistoricalAnalytics from "../components/HistoricalAnalytics"
import SelectedCoin from "../components/SelectedCoin"
import CoinSelector from "../components/CoinSelector"

const coins: Coin[] = [
  { title: "BTC", id: "bitcoin" },
  { title: "ETH", id: "ethereum" },
  { title: "SOL", id: "solana" },
  { title: "SUI", id: "sui" }
]
    

function Dashboard() {
    const [selectedCoin, setSelectedCoin] = useState<CoinId>("bitcoin")
    const [prices, setPrices] = useState<CryptoPrices|null>(null)

    const selected =  coins.find((coin) => coin.id === selectedCoin)
    const {
        dailyHistory,
        rawHistory,
        historyLoading,
        historyError
        } = useCoinHistory(selectedCoin)

    const [search, setSearch] = useState("")

    const filteredCoins = coins.filter((coin) => {
    return coin.title.toLowerCase().includes(search.toLowerCase())
    })

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


    useEffect(() => {
      async function fetchPrices() {
        try {
          const prices = await getCryptoPrices()
          setPrices(prices)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
      }
      fetchPrices()
    }, [])

    return (
        <main>
            <h1>Crypto Market Analytics</h1>
            <CoinSelector
                coins={filteredCoins}
                selectedCoin={selectedCoin}
                onSelect={setSelectedCoin}
            />

            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
            />

            {prices === null || selected === undefined? (
                <p>Loading price...</p>
                ) : (
                    <SelectedCoin
                    selected={selected}
                    price={prices[selectedCoin].usd}
                    change={prices[selectedCoin].usd_24h_change}
                    />
                )
            }

            {historyLoading ? (
                <p>Loading historical data...</p>
                ) : historyError ? (
                    <p>{historyError}</p>
                ) : (
                    <HistoricalAnalytics
                    high30D={highest}
                    low30D={lowest}
                    average30D={average}
                    return30D={returnPercent}
                    />
                )
            }

            {historyLoading ? (
                <div className="chart-card">
                    <h2>Price History</h2>
                    <p>Loading chart...</p>
                </div>
                ) : historyError ? (
                <p>{historyError}</p>
                ) : (
                    dailyHistory.length === 0 ? (
                        <p>No historical data available.</p>
                    ) : (
                        <PriceChart data={dailyHistory} />
                    )
                )
            }
        </main>
    )
}

export default Dashboard