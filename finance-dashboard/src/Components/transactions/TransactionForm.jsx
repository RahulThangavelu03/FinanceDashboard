import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTransaction, updateTransaction } from '../../store/slices/transactionsSlice'
import { categories } from '../../data/mockData'
import Button from '../Common/Button'
import './TransactionForm.css'

const TransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
      })
    }
  }, [transaction])

  const validate = () => {
    const newErrors = {}
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      ...formData,
      amount: parseFloat(formData.amount),
    }

    if (transaction) {
      dispatch(updateTransaction({ ...data, id: transaction.id }))
    } else {
      dispatch(addTransaction(data))
    }
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { category: '' }),
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const categoryOptions = categories[formData.type] || []

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Type</label>
        <div className="type-selector">
          <button
            type="button"
            className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
            onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
          >
            Expense
          </button>
          <button
            type="button"
            className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
            onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
          >
            Income
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {transaction ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
