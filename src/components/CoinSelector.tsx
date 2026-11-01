import type { Coin, CoinId } from "../types/crypto"

type CoinSelectorProps = {
  coins: Coin[]
  selectedCoin: CoinId
  onSelect: (coinId: CoinId) => void
  favoriteCoins: CoinId[]
  onToggleFavorite: (coinId: CoinId) => void
}

function CoinSelector({
  coins,
  selectedCoin,
  onSelect,
  favoriteCoins,
  onToggleFavorite
}: CoinSelectorProps) {
  return (
    <div className="coin-buttons">
      {coins.map((coin) => {
        const isFavorite = favoriteCoins.includes(coin.id)

        return (
          <div className="coin-option" key={coin.id}>
            <button
              type="button"
              onClick={() => onSelect(coin.id)}
              className={
                selectedCoin === coin.id ? "active-btn" : "coin-btn"
              }
            >
              {coin.title}
            </button>

            <button
              type="button"
              className="favorite-btn coin-btn"
              onClick={() => onToggleFavorite(coin.id)}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite
                  ? `Remove ${coin.title} from watchlist`
                  : `Add ${coin.title} to watchlist`
              }
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default CoinSelector