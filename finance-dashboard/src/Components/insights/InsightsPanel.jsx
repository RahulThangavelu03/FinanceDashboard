import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts'
import { 
  groupByCategory, 
  getMonthlyComparison, 
  formatCurrency, 
  calculateTotals 
} from '../../utils/helper'

import { categoryColors } from '../../data/mockData'
import Card from '../Common/Card'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart } from 'react-icons/fi'
import './InsightsPanel.css'

const InsightsPanel = () => {
  const transactions = useSelector((state) => state.transactions.items)
  const theme = useSelector((state) => state.theme.mode)

  const insights = useMemo(() => {
    const totals = calculateTotals(transactions)
    const categoryData = groupByCategory(transactions)
    const monthlyData = getMonthlyComparison(transactions)

    // Highest spending category
    const highestCategory = categoryData[0] || { name: 'N/A', value: 0 }

    // Monthly comparison
    const currentMonth = monthlyData[monthlyData.length - 1] || { expenses: 0, income: 0 }
    const previousMonth = monthlyData[monthlyData.length - 2] || { expenses: 0, income: 0 }
    
    const expenseChange = previousMonth.expenses > 0 
      ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1)
      : 0

    const incomeChange = previousMonth.income > 0
      ? ((currentMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1)
      : 0

    // Average transaction
    const avgTransaction = transactions.length > 0
      ? totals.expenses / transactions.filter(t => t.type === 'expense').length
      : 0

    // Savings rate
    const savingsRate = totals.income > 0 
      ? ((totals.income - totals.expenses) / totals.income * 100).toFixed(1)
      : 0

    return {
      highestCategory,
      expenseChange,
      incomeChange,
      avgTransaction,
      savingsRate,
      monthlyData,
      totalTransactions: transactions.length,
    }
  }, [transactions])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`tooltip-value ${entry.dataKey}`}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="insights-panel">
      <div className="insights-grid">
        <Card className="insight-card">
          <div className="insight-icon spending">
            <FiPieChart />
          </div>
          <div className="insight-content">
            <span className="insight-label">Highest Spending</span>
            <span className="insight-value">{insights.highestCategory.name}</span>
            <span className="insight-detail">{formatCurrency(insights.highestCategory.value)}</span>
          </div>
        </Card>

        <Card className="insight-card">
          <div className="insight-icon savings">
            <FiDollarSign />
          </div>
          <div className="insight-content">
            <span className="insight-label">Savings Rate</span>
            <span className={`insight-value ${parseFloat(insights.savingsRate) >= 0 ? 'positive' : 'negative'}`}>
              {insights.savingsRate}%
            </span>
            <span className="insight-detail">of total income</span>
          </div>
        </Card>

        <Card className="insight-card">
          <div className={`insight-icon ${parseFloat(insights.expenseChange) <= 0 ? 'positive' : 'negative'}`}>
            {parseFloat(insights.expenseChange) <= 0 ? <FiTrendingDown /> : <FiTrendingUp />}
          </div>
          <div className="insight-content">
            <span className="insight-label">Expense Trend</span>
            <span className={`insight-value ${parseFloat(insights.expenseChange) <= 0 ? 'positive' : 'negative'}`}>
              {insights.expenseChange > 0 ? '+' : ''}{insights.expenseChange}%
            </span>
            <span className="insight-detail">vs last month</span>
          </div>
        </Card>

        <Card className="insight-card">
          <div className="insight-icon average">
            <FiDollarSign />
          </div>
          <div className="insight-content">
            <span className="insight-label">Avg. Expense</span>
            <span className="insight-value">{formatCurrency(insights.avgTransaction)}</span>
            <span className="insight-detail">per transaction</span>
          </div>
        </Card>
      </div>

      <Card className="monthly-chart-card">
        <h3 className="chart-title">Monthly Comparison</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={insights.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} 
              />
              <XAxis 
                dataKey="month" 
                stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

export default InsightsPanel
