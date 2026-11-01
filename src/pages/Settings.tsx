import { useOutletContext } from "react-router"
import type { CoinId, HistoryRange } from "../types/crypto"

type SettingsContext = {
  selectedCoin: CoinId
  setSelectedCoin: (coinId: CoinId) => void
  selectedTimeRange: HistoryRange
  setSelectedTimeRange: (range: HistoryRange) => void
}

function Settings() {
  const {
    selectedCoin,
    setSelectedCoin,
    selectedTimeRange,
    setSelectedTimeRange,
  } = useOutletContext<SettingsContext>()

  return (
    <main className="dashboard-content">
      <section className="analytics-card">
        <h2 className="section-title">Settings</h2>
        <p>Manage your dashboard preferences.</p>

        <div className="settings-form">
          <div className="settings-field">
            <label htmlFor="selected-coin">Selected coin</label>
            <select
              id="selected-coin"
              value={selectedCoin}
              onChange={(event) =>
                setSelectedCoin(event.target.value as CoinId)
              }
            >
              <option value="bitcoin">Bitcoin (BTC)</option>
              <option value="ethereum">Ethereum (ETH)</option>
              <option value="solana">Solana (SOL)</option>
              <option value="sui">Sui (SUI)</option>
            </select>
          </div>

          <div className="settings-field">
            <label htmlFor="time-range">Chart time range</label>
            <select
              id="time-range"
              value={selectedTimeRange}
              onChange={(event) =>
                setSelectedTimeRange(Number(event.target.value) as HistoryRange)
              }
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>

          <p className="settings-help">
            These preferences apply across your Dashboard, Returns, and Analytics pages.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Settings