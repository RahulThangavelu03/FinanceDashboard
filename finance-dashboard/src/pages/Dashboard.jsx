import { useSelector } from 'react-redux'
 import SummaryCards from '../Components/dashboard/SummaryCards'
import BalanceTrendChart from '../Components/dashboard/BalanceTrendChart'
import SpendingBreakdown from '../Components/dashboard/SpendingBreakdown'
import TransactionList from '../Components/transactions/TransactionList'
import TransactionForm from '../Components/transactions/TransactionForm'
import Modal from '../Components/Common/Model'
import Button from '../Components/Common/Button'

import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const role = useSelector((state) => state.user.role)
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your financial activity</p>
        </div>
        {role === 'admin' && (
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus /> Add Transaction
          </Button>
        )}
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>

      <div className="recent-transactions">
        <h2 className="section-title">Recent Transactions</h2>
        <TransactionList />
      </div>

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

export default Dashboard
