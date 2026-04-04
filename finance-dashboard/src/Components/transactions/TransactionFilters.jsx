import { useDispatch, useSelector } from 'react-redux'
import { 
  setSearch, 
  setTypeFilter, 
  setCategoryFilter, 
  setSortBy, 
  setSortOrder,
  resetFilters 
} from '../../store/slices/filtersSlice'
import { categories } from '../../data/mockData'
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi'
import './TransactionFilters.css'

const TransactionFilters = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const allCategories = [...new Set([...categories.income, ...categories.expense])]

  return (
    <div className="filters-container">
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={filters.type}
          onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="filter-select"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="category">Sort by Category</option>
        </select>

        <select
          value={filters.sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          className="filter-select"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <button 
          className="reset-btn"
          onClick={() => dispatch(resetFilters())}
          title="Reset filters"
        >
          <FiRefreshCw />
        </button>
      </div>
    </div>
  )
}

export default TransactionFilters
