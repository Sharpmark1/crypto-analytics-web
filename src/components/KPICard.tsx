type KPICardProps = {
  title: string
  value: string
  change?: string
  tone?: "positive" | "negative"
}

function KPICard({ title, value, change, tone }: KPICardProps) {
  return (
    <div className="kpi-card">
      <p className="kpi-title">{title}</p>
      <p className={`kpi-value ${tone ? `kpi-value-${tone}` : ""}`}>
        {value}
      </p>
      {change && <span className="kpi-change">{change}</span>}
    </div>
  )
}

export default KPICard