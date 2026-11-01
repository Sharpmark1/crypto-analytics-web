import { useOutletContext } from "react-router"
import useCoinHistory from "../hooks/useCoinHistory"
import DailyReturnChart from "../components/DailyReturnChart"
import HistoricalAnalytics from "../components/HistoricalAnalytics"
import type {
  CoinId,
  HistoryRange
} from "../types/crypto"
import { calculateDailyReturns, calculateReturnStats } from "../utils/analytics"

type ReturnsContext = {
  selectedCoin: CoinId
  selectedTimeRange: HistoryRange
  setSelectedTimeRange: (range: HistoryRange) => void
}

const coinTitles: Record<CoinId, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  sui: "SUi"
}

function Returns() {
  const {
    selectedCoin,
    selectedTimeRange,
    setSelectedTimeRange,
  } = useOutletContext<ReturnsContext>()

  const {
    dailyHistory,
    historyLoading,
    historyError,
  } = useCoinHistory(selectedCoin, selectedTimeRange)

  const dailyReturns = calculateDailyReturns(dailyHistory)

  const {
  highest,
  lowest,
  average,
  returnPercent,
  } = calculateReturnStats(dailyHistory)

  return (
    <main className="dashboard-content">
      <section className="analytics-card">
        <h2 className="section-title">Returns Analysis</h2>

        <p>
          {coinTitles[selectedCoin]} · Last {selectedTimeRange} days
        </p>

        <div className="time-range-controls">
          {([7, 30, 90] as HistoryRange[]).map((range) => (
            <button
              key={range}
              type="button"
              aria-pressed={selectedTimeRange === range}
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
      </section>

      {historyLoading ? (
        <section className="analytics-card">
          <p className="chart-status" role="status">
            Loading return data...
          </p>
        </section>
      ) : historyError ? (
        <section className="analytics-card">
          <p className="chart-status chart-error" role="alert">
            {historyError}
          </p>
        </section>
      ) : dailyHistory.length === 0 ? (
        <section className="analytics-card">
          <p className="chart-status" role="status">
            No historical data available.
          </p>
        </section>
      ) : (
        <>
          <DailyReturnChart dailyReturns={dailyReturns} />

          <HistoricalAnalytics
            high={highest}
            low={lowest}
            average={average}
            returnPercent={returnPercent}
            days={selectedTimeRange}
          />
        </>
      )}
    </main>
  )
}

export default Returns