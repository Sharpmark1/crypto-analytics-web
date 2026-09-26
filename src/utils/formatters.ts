const currencyFormatter = new Intl.NumberFormat("en-US", {
    style : "currency",
    currency : "USD",
    minimumFractionDigits : 2,
    maximumFractionDigits : 2
})

export function formatCurrency(number: number) {
    return (
      currencyFormatter.format(number)
    )
}

export function formatPercent(number: number) {
    return (
        number >= 0
        ? `+${number.toFixed(2)}%`
        : `${number.toFixed(2)}%`
    )
}