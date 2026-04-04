import { useSelector, useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import { deleteTransaction } from '../../store/slices/transactionsSlice'
import TransactionItem from './TransactionItem'
import TransactionForm from './TransactionForm'
import Modal from '../Common/Model'
import EmptyState from '../Common/EmptyState'
import { FiList } from 'react-icons/fi'
import './TransactionList.css'

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transactions.items)
  const filters = useSelector((state) => state.filters)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      )
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type)
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category)
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date)
          break
        case 'amount':
          comparison = a.amount - b.amount
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        default:
          comparison = 0
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    return result
  }, [transactions, filters])

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id))
    }
  }

  if (filteredTransactions.length === 0) {
    return (
      <>
        <EmptyState
          icon={FiList}
          title="No transactions found"
          description={
            filters.search || filters.type !== 'all' || filters.category !== 'all'
              ? 'Try adjusting your filters'
              : 'Add your first transaction to get started'
          }
        />
      </>
    )
  }

  return (
    <>
      <div className="transactions-list">
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      </Modal>
    </>
  )
}

export default TransactionList
