import { useOutletContext } from "react-router"
import useCoinHistory from "../hooks/useCoinHistory"
import DailyReturnChart from "../components/DailyReturnChart"
import type {
  CoinId,
  HistoryRange
} from "../types/crypto"
import KPICard from "../components/KPICard"
import { formatPercent } from "../utils/formatters"
import { calculateDailyReturns } from "../utils/analytics"

type AnalyticsContext = {
  selectedCoin: CoinId
  selectedTimeRange: HistoryRange
}

const coinTitles: Record<CoinId, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  sui: "SUI",
}

function Analytics(){

    const { selectedCoin, selectedTimeRange } =
    useOutletContext<AnalyticsContext>()

    const {
    dailyHistory,
    historyLoading,
    historyError,
    } = useCoinHistory(selectedCoin, selectedTimeRange)

  const dailyReturns = calculateDailyReturns(dailyHistory)

  const returns = dailyReturns
    .map((point) => point.dailyReturn)
    .filter((value): value is number => value !== null)

  const averageDailyReturn =
    returns.length > 0
      ? returns.reduce((sum, value) => sum + value, 0) / returns.length
      : 0

  const bestDailyReturn =
    returns.length > 0 ? Math.max(...returns) : 0

  const worstDailyReturn =
    returns.length > 0 ? Math.min(...returns) : 0

  const positiveReturnCount = returns.filter(
    (value) => value > 0
  ).length

  const positiveDays =
    returns.length > 0
      ? (positiveReturnCount / returns.length) * 100
      : 0

    return(
      <main className="dashboard-content">

        <section className="analytics-card">
          <h2 className="section-title">
            {coinTitles[selectedCoin]} Analytics
          </h2>
          <p>Daily return statistics over {selectedTimeRange} days.</p>
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
            <div className="kpi-grid">
              <KPICard
                title="Average Daily Return"
                value={formatPercent(averageDailyReturn)}
                tone={averageDailyReturn > 0 ? "positive" : "negative"}
              />

              <KPICard
                title="Best Daily Return"
                value={formatPercent(bestDailyReturn)}
                tone={bestDailyReturn > 0 ? "positive" : "negative"}
              />

              <KPICard
                title="Worst Daily Return"
                value={formatPercent(worstDailyReturn)}
                tone={worstDailyReturn > 0 ? "positive" : "negative"}
              />

              <KPICard
                title="Positive Days"
                value={formatPercent(positiveDays)}
                tone={positiveDays > 50 ? "positive" : "negative"}
              />
            </div>
            <DailyReturnChart dailyReturns={dailyReturns} />
          </>)}
      </main>
    )
}

export default Analytics