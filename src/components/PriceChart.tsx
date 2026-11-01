import type { HistoricalPoint } from "../types/crypto"
import { formatCurrency } from "../utils/formatters"
// import { CartesianGrid } from "recharts"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

type PriceChartProps = {
    data : HistoricalPoint[]
}

function PriceChart( {data} : PriceChartProps ) {
    return (
        <>
            <ResponsiveContainer width="100%" height={400} >

                <LineChart data={data}>

                    {/* <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    /> */}

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 30, right: 30 }}
                        tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                        />
                    <YAxis
                        domain={["dataMin", "dataMax"]}
                        padding={{ top: 15, bottom: 15 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => formatCurrency(value)}
                        tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                        />
                    <Tooltip formatter = {(value) => [
                        formatCurrency(Number(value)), "Price"]}
                        contentStyle={{
                            background: "var(--card-bg-dark)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(128, 118, 25, 0.1)",
                            padding: "8px 12px",
                            }
                        }

                        cursor={{
                            stroke: "color-mix(in srgb, var(--card-border) 80%, transparent)",
                            strokeWidth: 0.5
                        }}

                        labelStyle={{
                            color: "var(--accent)",
                            fontSize: "12px",
                            marginBottom: "2px",
                            fontWeight: "400"
                        }}
                        itemStyle={{
                            color: "white",
                            fontSize: "13px",
                            fontWeight: "500"
                            }
                        }
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        dot={false}
                        strokeWidth={1.5}
                        stroke="var(--text-muted)"
                        />
                </LineChart >
            </ResponsiveContainer>
        </>
    )
}

export default PriceChart