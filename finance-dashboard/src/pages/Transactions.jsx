import { useSelector } from 'react-redux'
import { useState } from 'react'
import TransactionFilters from '../Components/transactions/TransactionFilters'
import TransactionList from '../Components/transactions/TransactionList'
import TransactionForm from '../Components/transactions/TransactionForm'
import Modal from '../Components/Common/Model'

import Button from '../Components/Common/Button'
import { exportToCSV,exportToJSON } from '../utils/helper'
import { FiPlus, FiDownload } from 'react-icons/fi'
import './Transactions.css'

const Transactions = () => {
  const role = useSelector((state) => state.user.role)
  const transactions = useSelector((state) => state.transactions.items)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">Manage and track all your transactions</p>
        </div>
        <div className="header-actions">
          <div className="export-wrapper">
            <Button 
              variant="secondary" 
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <FiDownload /> Export
            </Button>
            {showExportMenu && (
              <div className="export-menu">
                <button onClick={() => { exportToCSV(transactions); setShowExportMenu(false); }}>
                  Export as CSV
                </button>
                <button onClick={() => { exportToJSON(transactions); setShowExportMenu(false); }}>
                  Export as JSON
                </button>
              </div>
            )}
          </div>
          {role === 'admin' && (
            <Button onClick={() => setShowAddModal(true)}>
              <FiPlus /> Add Transaction
            </Button>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionList />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
      >
        <TransactionForm onClose={() => setShowAddModal(false)} />
      </Modal>
    </div>
  )
}

export default Transactions
