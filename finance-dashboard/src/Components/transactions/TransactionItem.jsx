import { useSelector } from 'react-redux'
import { formatDate,formatCurrency } from '../../utils/helper'
import { categoryColors } from '../../data/mockData'
import { FiEdit2, FiTrash2, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi'
import './TransactionItem.css'

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const role = useSelector((state) => state.user.role)
  const isAdmin = role === 'admin'

  return (
    <div className="transaction-item">
      <div className="transaction-icon-wrapper">
        <div className={`transaction-icon ${transaction.type}`}>
          {transaction.type === 'income' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
        </div>
      </div>

      <div className="transaction-details">
        <h4 className="transaction-description">{transaction.description}</h4>
        <div className="transaction-meta">
          <span 
            className="transaction-category"
            style={{ 
              backgroundColor: `${categoryColors[transaction.category]}20`,
              color: categoryColors[transaction.category] 
            }}
          >
            {transaction.category}
          </span>
          <span className="transaction-date">{formatDate(transaction.date)}</span>
        </div>
      </div>

      <div className="transaction-amount-wrapper">
        <span className={`transaction-amount ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
      </div>

      {isAdmin && (
        <div className="transaction-actions">
          <button 
            className="action-btn edit"
            onClick={() => onEdit(transaction)}
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button 
            className="action-btn delete"
            onClick={() => onDelete(transaction.id)}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      )}
    </div>
  )
}

export default TransactionItem
