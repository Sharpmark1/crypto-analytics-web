import { useState, useEffect } from "react"
import { useOutletContext } from "react-router"
import useCoinHistory from "../hooks/useCoinHistory"
import MarketSnapshot from "../components/MarketSnapshot"
import { getCryptoPrices } from "../api/client"
import type {
  Coin,
  CoinId,
  CryptoPrices,
  HistoryRange
} from "../types/crypto"

import PriceChart from "../components/PriceChart"
import HistoricalAnalytics from "../components/HistoricalAnalytics"
import SelectedCoin from "../components/SelectedCoin"
import CoinSelector from "../components/CoinSelector"
import DailyReturnChart from "../components/DailyReturnChart"
import type { DailyReturnPoint } from "../types/crypto"
import {
    formatCurrency,
    formatPercent
 } from "../utils/formatters"

type DashboardContext = {
    search: string
    favoriteCoins: CoinId[]
    toggleFavorite: (coinId: CoinId) => void
    selectedCoin: CoinId
    setSelectedCoin: (coinId: CoinId) => void
    selectedTimeRange: HistoryRange
    setSelectedTimeRange: (range: HistoryRange) => void
}

const coins: Coin[] = [
  { title: "BTC", id: "bitcoin" },
  { title: "ETH", id: "ethereum" },
  { title: "SOL", id: "solana" },
  { title: "SUI", id: "sui" },
//   { title: "BNB", id: "binancecoin" },
//   { title: "XRP", id: "ripple" },
//   { title: "ADA", id: "cardano" },
//   { title: "DOGE", id: "dogecoin" },
//   { title: "AVAX", id: "avalanche-2" },
//   { title: "LINK", id: "chainlink" },
]


function Dashboard() {

    const [prices, setPrices] = useState<CryptoPrices|null>(null)
    const {
        search,
        favoriteCoins,
        toggleFavorite,
        selectedCoin,
        setSelectedCoin,
        selectedTimeRange,
        setSelectedTimeRange,
    } = useOutletContext<DashboardContext>()

    const selected =  coins.find((coin) => coin.id === selectedCoin)
    const {
        dailyHistory,
        rawHistory,
        historyLoading,
        historyError
    } = useCoinHistory(selectedCoin, selectedTimeRange)

    const dailyReturns: DailyReturnPoint[] = dailyHistory.map(
        (currentDay, index) => {

            let returnRate = null

            if (index > 0) {
                const previousPrice = dailyHistory[index - 1].price
                returnRate = ((currentDay.price - previousPrice) / previousPrice ) * 100
            }

            return {
            date: currentDay.date,
            price: currentDay.price,
            dailyReturn: returnRate
            }
        }
    )

    const filteredCoins = coins.filter((coin) => {
    return coin.title.toLowerCase().includes(search.toLowerCase())
    })

    const watchedCoins = coins.filter((coin) =>
        favoriteCoins.includes(coin.id)
    )

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
        <main className="dashboard-content">
            <section className="dashboard-controls">
                <CoinSelector
                    coins={filteredCoins}
                    selectedCoin={selectedCoin}
                    onSelect={setSelectedCoin}
                    favoriteCoins={favoriteCoins}
                    onToggleFavorite={toggleFavorite}
                />
            </section>

            <section className="watchlist-card">
                <h2>My Watchlist</h2>

                {watchedCoins.length === 0 ? (
                    <p>Star a coin above to add it to your watchlist.</p>
                ) : (
                    <div className="watchlist-items">
                        {watchedCoins.map((coin) => {
                            const coinPrice = prices?.[coin.id]
                            return (
                                <button
                                key={coin.id}
                                type="button"
                                className={
                                    selectedCoin === coin.id
                                    ? "watchlist-item watchlist-item-selected"
                                    : "watchlist-item"
                                }
                                onClick={() => setSelectedCoin(coin.id)}
                                >
                                    <span className="watchlist-item-symbol">
                                        ★ {coin.title}
                                    </span>

                                    {coinPrice ? (
                                        <div className="watchlist-item-details">
                                        <span>{formatCurrency(coinPrice.usd)}</span>

                                        <span
                                            className={
                                            coinPrice.usd_24h_change >= 0
                                                ? "watchlist-change positive"
                                                : "watchlist-change negative"
                                            }
                                        >
                                            {formatPercent(coinPrice.usd_24h_change)}
                                        </span>
                                        </div>
                                    ) : (
                                        <span>Loading price...</span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}
            </section>

            {prices === null || selected === undefined ? (
            <section className="analytics-card">
                <p>Loading price...</p>
            </section>
            ) : (
            <>
                <MarketSnapshot
                    coins={coins}
                    prices={prices}
                />

                <SelectedCoin
                selected={selected}
                price={prices[selectedCoin].usd}
                change={prices[selectedCoin].usd_24h_change}
                />
            </>
            )}

            <section className="analytics-card">
                <h2 className="section-title">Price History</h2>

                <div className="time-range-controls">
                {([7, 30, 90] as HistoryRange[]).map((range) => (
                    <button
                    key={range}
                    aria-pressed={selectedTimeRange === range}
                    type="button"
                    className={
                        selectedTimeRange === range
                        ? "range-button range-button-active"
                        : "range-button"
                    }
                    onClick={() => setSelectedTimeRange(range)}
                    >
                    {range}D
                    </button>
                ))}
                </div>

                {historyLoading ? (
                    <p className="chart-status" role="status">
                        Loading {selectedTimeRange} days of {selected?.title ?? "coin"} price history...
                    </p>
                ) : historyError ? (
                    <p className="chart-status chart-error" role="alert">
                        {historyError}
                    </p>
                ) : dailyHistory.length === 0 ? (
                    <p className="chart-status" role="status">
                        No price history available for the selected range.
                    </p>
                ) : (
                    <PriceChart data={dailyHistory} />
                )}
            </section>

            {historyLoading ? (
            <section className="analytics-card">
                <h2 className="section-title">Daily Returns</h2>
                <p>Loading daily returns...</p>
            </section>
            ) : historyError ? (
            <section className="analytics-card">
                <h2 className="section-title">Daily Returns</h2>
                <p>{historyError}</p>
            </section>
            ) : (
            <DailyReturnChart dailyReturns={dailyReturns} />
            )}

            {historyLoading || historyError ? (
            <section className="analytics-card">
                <h2 className="section-title">Historical Analytics</h2>
                <p>
                {historyLoading
                    ? "Loading historical data..."
                    : historyError}
                </p>
            </section>
            ) : (
            <HistoricalAnalytics
                high={highest}
                low={lowest}
                average={average}
                returnPercent={returnPercent}
                days={selectedTimeRange}
            />
            )}
        </main>
    )
}

export default Dashboard