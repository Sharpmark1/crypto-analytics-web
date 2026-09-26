import type { Coin } from "./CoinSelector"
import type { CryptoPrices } from "../types/crypto"
import KPICard from "./KPICard"
import { formatPercent, formatCurrency } from "../utils/formatters"

type MarketSnapshotProps = {
    coins: Coin[]
    prices: CryptoPrices
}

function MarketSnapshot ({coins, prices}: MarketSnapshotProps) {
    return (
        <section>
            <h2 className="section-title">Market Snapshot</h2>

            <div className="kpi-grid">
                {coins.map(coin => {
                    return (
                        <KPICard 
                            key={coin.id}
                            title={coin.title}
                            value={formatCurrency(prices[coin.id].usd)}
                            change={formatPercent(prices[coin.id].usd_24h_change)}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default MarketSnapshot