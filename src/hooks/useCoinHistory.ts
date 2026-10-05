import { useState, useEffect } from "react"
import { getCoinHistory } from "../api/client"
import type { 
    HistoricalPoint,
    RawHistoricalPoint,
    CoinId
 } from "../types/crypto"

function useCoinHistory(selectedCoin: CoinId) : {
    dailyHistory: HistoricalPoint[], 
    rawHistory: RawHistoricalPoint[], 
    historyLoading: boolean, 
    historyError: string | null} {

    const [dailyHistory, setDailyHistory] = useState<HistoricalPoint[]>([])
    const [rawHistory, setRawHistory] = useState<RawHistoricalPoint[]>([])
    const [historyLoading, setHistoryLoading] = useState(true)
    const [historyError, setHistoryError] = useState<string | null>(null)

    useEffect(() => {

        setHistoryLoading(true)
        setHistoryError(null)
        setDailyHistory([])
        setRawHistory([])

        async function fetchHistory(){
            try {
                const data = await getCoinHistory(selectedCoin)
                
                const rawHistoryData : RawHistoricalPoint[] = data.prices.map((point : [number, number]) => {
                    return {
                    timestamp: point[0],
                    price: point[1]
                    }
                })

                const grouped = rawHistoryData.reduce<Record<string, number[]>>((acc, point) => {
                    const date = new Date(point.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit"
                    })
                    if(!acc[date]) {
                    acc[date] = []
                    }
                    acc[date].push(point.price)
                    return acc 
                }, {})

                const dailyHistory = Object.entries(grouped).map(([date, price]) => {
                    return {
                    date,
                    price: price[price.length - 1]
                    }
                })

                setRawHistory(rawHistoryData)
                setDailyHistory(dailyHistory)
                setHistoryLoading(false)
                
            } catch (error) {
                console.error("History API error:", error)
                setHistoryError("Failed to load historical data")
                setHistoryLoading(false)
            }
        }
        fetchHistory()
    },[selectedCoin])

    return {
        dailyHistory,
        rawHistory,
        historyLoading,
        historyError
    }
}

export default useCoinHistory