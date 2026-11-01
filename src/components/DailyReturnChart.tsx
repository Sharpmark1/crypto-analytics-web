import { formatPercent } from "../utils/formatters"
import type { DailyReturnPoint } from "../types/crypto"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Rectangle
} from "recharts"

type DailyReturnChartProps = {
    dailyReturns: DailyReturnPoint[]
}

function DailyReturnChart({ dailyReturns }: DailyReturnChartProps) {
    const chartData = dailyReturns.filter((point) => {
        return point.dailyReturn !== null
    })

    return (
        <section className="analytics-card">
            <h2 className="section-title">Daily Returns</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
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
                        tickFormatter={(value) => formatPercent(value)}
                        tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                    />
                    <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="1" />

                    <Bar
                        dataKey="dailyReturn"
                        shape={(props: any) => {
                            const { x, y, width, height, payload } = props;
                            const isPositive = payload?.dailyReturn >= 0;
                            const fill = isPositive ? "#10b981" : "#ef4444";

                            return <Rectangle x={x} y={y} width={width} height={height} fill={fill} />;
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            formatPercent(Number(value)), "Daily Return"
                        ]}

                        cursor={{ fill: "color-mix(in srgb, var(--card-border) 10%, transparent)" }}

                        contentStyle={{
                            background: "var(--card-bg-dark)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px color-mix(in srgb, var(--accent) 5%, transparent)",
                            padding: "8px 12px",
                            }
                        }
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
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}

export default DailyReturnChart