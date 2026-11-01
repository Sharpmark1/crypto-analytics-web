import KPICard from "./KPICard"
import { formatCurrency, formatPercent } from "../utils/formatters"

type HistoricalAnalyticsProps = {
    high: number
    low: number
    average: number
    returnPercent: number
    days: number
}

function HistoricalAnalytics({high, low, average, returnPercent, days}: HistoricalAnalyticsProps) {
    return (
        <section>
            <h2 className="section-title">Historical Analytics</h2>
            <div className="kpi-grid">

                <KPICard
                    title={`${days}D High`}
                    value={formatCurrency(high)}
                />

                <KPICard
                    title={`${days}D Low`}
                    value={formatCurrency(low)}
                />

                <KPICard
                    title={`${days}D Average`}
                    value={formatCurrency(average)}
                />

                <KPICard
                    title={`${days}D Return`}
                    value={formatPercent(returnPercent)}
                    tone={returnPercent > 0 ? "positive" : "negative"}
                />
            </div>
        </section>
    )
}

export default HistoricalAnalytics