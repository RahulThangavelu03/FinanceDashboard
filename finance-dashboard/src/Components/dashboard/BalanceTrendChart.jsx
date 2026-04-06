import { useSelector } from 'react-redux'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { getBalanceTrend, formatCurrency } from '../../utils/helper'
import Card from '../Common/Card'
import EmptyState from '../Common/EmptyState'
import { FiTrendingUp } from 'react-icons/fi'
import './BalanceTrendChart.css'

const BalanceTrendChart = () => {
  const transactions = useSelector((state) => state.transactions.items)
  const theme = useSelector((state) => state.theme.mode)
  const data = getBalanceTrend(transactions)

  if (data.length === 0) {
    return (
      <Card className="chart-card">
        <h3 className="chart-title">Balance Trend</h3>
        <EmptyState 
          icon={FiTrendingUp}
          title="No data yet"
          description="Add some transactions to see your balance trend"
        />
      </Card>
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value balance">
            Balance: {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="chart-card">
      <h3 className="chart-title">Balance Trend</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} 
            />
            <XAxis 
              dataKey="date" 
              stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#6366f1" 
              strokeWidth={2}
              fill="url(#balanceGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default BalanceTrendChart
