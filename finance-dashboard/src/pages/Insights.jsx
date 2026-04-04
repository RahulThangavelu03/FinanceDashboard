import InsightsPanel from '../Components/insights/InsightsPanel'
import './Insights.css'

const Insights = () => {
  return (
    <div className="insights-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Insights</h1>
          <p className="page-subtitle">Understand your spending patterns and trends</p>
        </div>
      </div>

      <InsightsPanel />
    </div>
  )
}

export default Insights
