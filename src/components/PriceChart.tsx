import type { HistoricalPoint } from "../types/crypto"
import { CartesianGrid } from "recharts"
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
        <div className="chart-card">
            <h2>Price History</h2>
            <ResponsiveContainer width="100%" height={400} >
                
                <LineChart data={data}>

                    <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        />
                    <YAxis
                        domain={["dataMin", "dataMax"]}
                        padding={{ top: 15, bottom: 15 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                    <Tooltip formatter = {(value) => [`$${Number(value).toFixed(2)}`, "Price"]}/>
                    <Line
                        type="monotone"
                        dataKey="price"
                        dot={false}
                        strokeWidth={2}
                        />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart