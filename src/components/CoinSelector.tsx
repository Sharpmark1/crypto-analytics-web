import type { Coin, CoinId } from "../types/crypto"

type CoinSelectorProps = {
  coins: Coin[]
  selectedCoin: CoinId
  onSelect: (coinId: CoinId) => void
}

function CoinSelector({
  coins,
  selectedCoin,
  onSelect,
}: CoinSelectorProps) {
  return (
    <div className="coin-buttons">
      {coins.map((coin) => {
        return (
          <button
            key={coin.id}
            onClick={() => onSelect(coin.id)}
            className={
              selectedCoin === coin.id ? "active-btn" : "coin-btn"
            }
          >
            {coin.title}
          </button>
        )
      })}
    </div>
  )
}

export default CoinSelector