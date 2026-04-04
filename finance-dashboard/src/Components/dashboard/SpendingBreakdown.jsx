import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { groupByCategory, formatCurrency } from '../../utils/helper'
import { categoryColors } from '../../data/mockData'
import Card from '../Common/Card'
import EmptyState from '../Common/EmptyState'
import { FiPieChart } from 'react-icons/fi'
import './SpendingBreakdown.css'

const SpendingBreakdown = () => {
  const transactions = useSelector((state) => state.transactions.items)
  const data = groupByCategory(transactions)

  if (data.length === 0) {
    return (
      <Card className="chart-card">
        <h3 className="chart-title">Spending Breakdown</h3>
        <EmptyState 
          icon={FiPieChart}
          title="No expenses yet"
          description="Add some expense transactions to see your spending breakdown"
        />
      </Card>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value expense">{formatCurrency(data.value)}</p>
        </div>
      )
    }
    return null
  }

  const renderCustomLabel = ({ name, percent }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`
  }

  return (
    <Card className="chart-card">
      <h3 className="chart-title">Spending Breakdown</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.name] || '#64748b'} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle"
              formatter={(value) => <span className="legend-label">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default SpendingBreakdown
