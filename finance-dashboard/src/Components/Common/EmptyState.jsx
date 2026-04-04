import { FiInbox } from 'react-icons/fi'
import './Empty.css'

const EmptyState = ({ 
  icon: Icon = FiInbox, 
  title = 'No data', 
  description = 'There is nothing to display here yet.',
  action 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  )
}

export default EmptyState
