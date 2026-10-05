const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    
})

export function formatCurrency (value: number) {
    return currencyFormatter.format(value)
}

export function formatPercent (value: number) {
    return (value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`)
}