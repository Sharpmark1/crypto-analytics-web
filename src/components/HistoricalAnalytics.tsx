import KPICard from "./KPICard"
import { formatCurrency, formatPercent } from "../utils/formatters"

type HistoricalAnalyticsProps = {
    high30D: number
    low30D: number
    average30D: number
    return30D: number
}

function HistoricalAnalytics({high30D, low30D, average30D, return30D}: HistoricalAnalyticsProps) {
    return (
        <section>
            <h2 className="section-title">Historical Analytics</h2>
            <div className="kpi-grid">

                <KPICard 
                    title="30D High"
                    value={formatCurrency(high30D)}
                />

                <KPICard
                    title="30D Low"
                    value={formatCurrency(low30D)}
                />

                <KPICard
                    title="30D Average"
                    value={formatCurrency(average30D)}
                />

                <KPICard
                    title="30D Return"
                    value={formatPercent(return30D)}
                />
            </div>
        </section>
    )
}

export default HistoricalAnalytics