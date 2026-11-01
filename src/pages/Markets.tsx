import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { getCryptoPrices } from "../api/client"
import type { Coin, CoinId, CryptoPrices } from "../types/crypto"
import { formatCurrency, formatPercent } from "../utils/formatters"

type MarketsContext = {
  search: string
  favoriteCoins: CoinId[]
  toggleFavorite: (coinId: CoinId) => void
}

type SortKey = "price" | "change"
type SortDirection = "asc" | "desc"

const marketCoins: Coin[] = [
  { title: "BTC", id: "bitcoin" },
  { title: "ETH", id: "ethereum" },
  { title: "SOL", id: "solana" },
  { title: "SUI", id: "sui" },
]

function Markets() {

    const { search, favoriteCoins, toggleFavorite } = useOutletContext<MarketsContext>()

    const [prices, setPrices] = useState<CryptoPrices | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [sortKey, setSortKey] = useState<SortKey>("price")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

useEffect(() => {
  async function fetchPrices() {
    setLoading(true)
    setError(null)

    try {
      const data = await getCryptoPrices()
      setPrices(data)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load market prices"
      )
    } finally {
      setLoading(false)
    }
  }

  fetchPrices()
}, [])

    const filteredCoins = marketCoins.filter((coin) => {
    return (
        (coin.title.toLowerCase().includes(search.toLowerCase()))
        || (coin.id.toLowerCase().includes(search.toLowerCase()))
        )
    })

    const sortedCoins = prices
        ? [...filteredCoins].sort((a, b) => {
            const aValue =
                sortKey === "price"
                ? prices[a.id].usd
                : prices[a.id].usd_24h_change

            const bValue =
                sortKey === "price"
                ? prices[b.id].usd
                : prices[b.id].usd_24h_change

            return sortDirection === "asc"
                ? aValue - bValue
                : bValue - aValue
            })
        : filteredCoins

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDirection((current) =>
            current === "asc" ? "desc" : "asc"
            )
        } else {
            setSortKey(key)
            setSortDirection("desc")
        }
    }

    return (
        <main className="dashboard-content">
            <section className="analytics-card">
                <h2>Markets</h2>

                <div className="market-table-wrapper">
                    <table className="market-table">
                        <thead>
                            <tr>
                                <th scope="col">Asset</th>
                                <th
                                    scope="col"
                                    aria-sort={
                                        sortKey === "price"
                                        ? sortDirection === "asc" ? "ascending" : "descending"
                                        : "none"
                                    }
                                    >
                                    <button
                                        type="button"
                                        className="table-sort-button"
                                        onClick={() => handleSort("price")}
                                    >
                                        Price (USD)
                                        {sortKey === "price"
                                        ? sortDirection === "asc" ? " ↑" : " ↓"
                                        : " ↕"}
                                    </button>
                                </th>

                                <th
                                    scope="col"
                                    aria-sort={
                                        sortKey === "change"
                                        ? sortDirection === "asc" ? "ascending" : "descending"
                                        : "none"
                                    }
                                    >
                                    <button
                                        type="button"
                                        className="table-sort-button"
                                        onClick={() => handleSort("change")}
                                    >
                                        24h Change
                                        {sortKey === "change"
                                        ? sortDirection === "asc" ? " ↑" : " ↓"
                                        : " ↕"}
                                    </button>
                                </th>

                                <th scope="col">Watchlist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>Loading market prices...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={4} role="alert">
                                        {error}
                                    </td>
                                </tr>
                            ) : !prices ? (
                                <tr>
                                    <td colSpan={4}>No market data available.</td>
                                </tr>
                            ) : filteredCoins.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>No coins match "{search}".</td>
                                </tr>
                            ) : (
                                sortedCoins.map((coin) => {
                                const isFavorite = favoriteCoins.includes(coin.id)
                                const coinPrice = prices[coin.id].usd
                                const coinReturn = prices[coin.id].usd_24h_change

                                return (
                                    <tr key={coin.id}>
                                        <th scope="row">{coin.title}</th>
                                        <td>{formatCurrency(coinPrice)}</td>
                                        <td className={coinReturn >= 0 ? "positive" : "negative"}>
                                            {formatPercent(coinReturn)}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="favorite-btn"
                                                aria-pressed={isFavorite}
                                                aria-label={
                                                isFavorite
                                                    ? `Remove ${coin.title} from watchlist`
                                                    : `Add ${coin.title} to watchlist`
                                                }
                                                onClick={() => toggleFavorite(coin.id)}
                                            >
                                                {isFavorite ? "★" : "☆"}
                                            </button>
                                        </td>
                                    </tr>
                                )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Markets