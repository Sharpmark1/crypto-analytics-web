import type { Coin } from "./CoinSelector"
import { formatCurrency, formatPercent } from "../utils/formatters"

type SelectedCoinProps = {
  selected: Coin
  price: number
  change: number
}

function SelectedCoin({selected, price, change}: SelectedCoinProps) {
    return(
        <section className="selected-coin">
            <div className="selected-header">
                <span>Selected Coin</span>
                <h2>{selected.title}</h2>
            </div>

            <div className="selected-metrics">
                <div>
                    <span>Current Price: </span>
                    <strong>
                        {formatCurrency(price)}
                    </strong>
                </div>

                <div>
                    <span>24h Change: </span>
                    <strong>
                        {formatPercent(change)}
                    </strong>
                </div>                
            </div>

        </section>
    )
}

export default SelectedCoin