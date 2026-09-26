type KPICardProps = {
  title: string
  value: string
  change?: string
}

function KPICard({ title, value, change }: KPICardProps) {
  return (
    <div className="kpi-card">
      <p className="kpi-title">{title}</p>
      <h2 className="kpi-value">{value}</h2>
      { change && <span className="kpi-change">{change}</span> }
    </div>
  )
}

export default KPICard