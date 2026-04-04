export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const getMonthYear = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date)
}

export const calculateTotals = (transactions) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount
      } else {
        acc.expenses += transaction.amount
      }
      acc.balance = acc.income - acc.expenses
      return acc
    },
    { income: 0, expenses: 0, balance: 0 }
  )
}

export const groupByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const grouped = expenses.reduce((acc, transaction) => {
    const category = transaction.category
    if (!acc[category]) {
      acc[category] = 0
    }
    acc[category] += transaction.amount
    return acc
  }, {})
  
  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export const getBalanceTrend = (transactions) => {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  const dailyData = sorted.reduce((acc, transaction) => {
    const date = transaction.date
    if (!acc[date]) {
      acc[date] = { income: 0, expenses: 0 }
    }
    if (transaction.type === 'income') {
      acc[date].income += transaction.amount
    } else {
      acc[date].expenses += transaction.amount
    }
    return acc
  }, {})

  let runningBalance = 0
  return Object.entries(dailyData).map(([date, data]) => {
    runningBalance += data.income - data.expenses
    return {
      date: formatDateShort(date),
      balance: runningBalance,
      income: data.income,
      expenses: data.expenses,
    }
  })
}

export const getMonthlyComparison = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const monthYear = getMonthYear(transaction.date)
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expenses: 0 }
    }
    if (transaction.type === 'income') {
      acc[monthYear].income += transaction.amount
    } else {
      acc[monthYear].expenses += transaction.amount
    }
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([month, data]) => ({
      month,
      ...data,
      net: data.income - data.expenses,
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month))
}

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    t.amount,
  ])
  
  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

export const exportToJSON = (transactions) => {
  const jsonContent = JSON.stringify(transactions, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.json'
  a.click()
  window.URL.revokeObjectURL(url)
}
