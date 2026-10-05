import type { Coin } from "../types/crypto"
import { formatCurrency, formatPercent } from "../utils/formatters"

type SelectedCoinProps = {
    selected: Coin
    price: number
    change: number
}

function SelectedCoin ({selected, price, change}: SelectedCoinProps) {
    return (
        <section className="selected-coin">
            <div className="selected-header">
                <h1>{selected?.title}</h1>
            </div>
            <div className="selected-metrics">
                <p>Current Price: {formatCurrency(price)}</p>
                <p>24H Change: {formatPercent(change)}</p>
            </div>
        </section>
    )
}

export default SelectedCoin