import type { CryptoPrices, Coin } from "../types/crypto"
import KPICard from "./KPICard"
import { formatCurrency, formatPercent } from "../utils/formatters"

type MarketSnapshotProps = {
    coins: Coin[]
    prices: CryptoPrices
}

function MarketSnapshot ({coins, prices}: MarketSnapshotProps) {
    return (
        <section>
            <h2 className="section-title">Market Snapshot</h2>
            <div className="kpi-grid">
                {coins.map((coin) => {  
                    const change = prices[coin.id].usd_24h_change 
                    return (
                        <KPICard
                            key={coin.id}
                            title={coin.title}
                            value={formatCurrency(prices[coin.id].usd)} 
                            change={formatPercent(change)}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default MarketSnapshot