import { useEffect, useState } from "react"
import type { CoinId, HistoryRange } from "../types/crypto"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"
import Header from "./Header"

function Layout() {

  const [selectedCoin, setSelectedCoin] = useState<CoinId>(() => {
    const savedCoin = localStorage.getItem("selectedCoin")

    if (
      savedCoin === "bitcoin" ||
      savedCoin === "ethereum" ||
      savedCoin === "solana" ||
      savedCoin === "sui"
    ) {
      return savedCoin
    }

    return "bitcoin"
  })

  useEffect(() => {
      localStorage.setItem("selectedCoin", selectedCoin)
  }, [selectedCoin])

  const [selectedTimeRange, setSelectedTimeRange] =
    useState<HistoryRange>(() => {
      const savedRange = localStorage.getItem("selectedTimeRange")

      if (savedRange === "7" || savedRange === "30" || savedRange === "90") {
        return Number(savedRange) as HistoryRange
      }

      return 30
    })

  useEffect(() => {
    localStorage.setItem("selectedTimeRange", String(selectedTimeRange))
  }, [selectedTimeRange])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")

  const [favoriteCoins, setFavoriteCoins] = useState<CoinId[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteCoins")

    if (savedFavorites) {
      try {
        return JSON.parse(savedFavorites) as CoinId[]
      } catch {
        return []
      }
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      "favoriteCoins",
      JSON.stringify(favoriteCoins)
    )
  }, [favoriteCoins])

  function toggleFavorite(coinId: CoinId) {
      setFavoriteCoins((currentFavorites) =>
          currentFavorites.includes(coinId)
          ? currentFavorites.filter((id) => id !== coinId)
          : [...currentFavorites, coinId]
      )
  }

  return (
    <div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <section className="main-area">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
        />

        <div className="page-content">
        <Outlet
          context={{
            search,
            favoriteCoins,
            toggleFavorite,
            selectedCoin,
            setSelectedCoin,
            selectedTimeRange,
            setSelectedTimeRange,
          }}
        />
        </div>
      </section>
    </div>
  )
}

export default Layout