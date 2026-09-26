import type { CoinId } from "../types/crypto"

export type Coin = {
  title: string
  id: CoinId
}

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
      {coins.map((coin) => (
        <button
          key={coin.id}
          onClick={() => onSelect(coin.id)}
          className={selectedCoin === coin.id ? "active" : ""}
        >
          {coin.title}
        </button>
      ))}
    </div>
  )
}

export default CoinSelector