import { useSelector } from 'react-redux'
import {FiTrendingUp, FiTrendingDown, FiActivity  } from 'react-icons/fi'
import { FaRupeeSign } from "react-icons/fa"
import { calculateTotals, formatCurrency } from '../../utils/helper'
import './SummaryCards.css'

const SummaryCards = () => {
  const transactions = useSelector((state) => state.transactions.items)
  const { income, expenses, balance } = calculateTotals(transactions)

  const cards = [
    {
      label: 'Total Balance',
      value: balance,
      icon: FaRupeeSign,
      color: balance >= 0 ? 'success' : 'danger',
      trend: balance >= 0 ? '+' : '',
    },
    {
      label: 'Total Income',
      value: income,
      icon: FiTrendingUp,
      color: 'success',
      trend: '+',
    },
    {
      label: 'Total Expenses',
      value: expenses,
      icon: FiTrendingDown,
      color: 'danger',
      trend: '-',
    },
    {
      label: 'Transactions',
      value: transactions.length,
      icon: FiActivity,
      color: 'primary',
      isCount: true,
    },
  ]

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.label} className={`summary-card ${card.color}`}>
          <div className="summary-card-header">
            <span className="summary-label">{card.label}</span>
            <div className={`summary-icon ${card.color}`}>
              <card.icon />
            </div>
          </div>
          <div className="summary-value">
            {card.isCount ? card.value : formatCurrency(card.value)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
