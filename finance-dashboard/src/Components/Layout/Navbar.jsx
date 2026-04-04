import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/slices/themeSlice'
import { setRole } from '../../store/slices/userSlice'
import { FiSun, FiMoon, FiUser, FiChevronDown } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode)
  const { role } = useSelector((state) => state.user)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole))
    setDropdownOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Finance Dashboard</h1>
      </div>

      <div className="navbar-actions">
        <div className="role-selector" ref={dropdownRef}>
          <button 
            className="role-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FiUser />
            <span>Role: {role.charAt(0).toUpperCase() + role.slice(1)}</span>
            <FiChevronDown className={`chevron ${dropdownOpen ? 'open' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <div className="role-dropdown">
              <button
                className={`role-option ${role === 'viewer' ? 'active' : ''}`}
                onClick={() => handleRoleChange('viewer')}
              >
                <span className="role-badge viewer">Viewer</span>
                <span className="role-description">Can only view data</span>
              </button>
              <button
                className={`role-option ${role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleChange('admin')}
              >
                <span className="role-badge admin">Admin</span>
                <span className="role-description">Can add/edit transactions</span>
              </button>
            </div>
          )}
        </div>

        <button 
          className="theme-toggle"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
