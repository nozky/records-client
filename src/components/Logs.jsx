import React from 'react'

const Logs = ({showLogs,setShowLogs}) => {
  return (
    <div className={showLogs? "logs-show" : "logs"} >
      <div className="container flex-row flex-space-around">
        <h1>logs</h1>
        <button className="btn btn-outline-light" onClick={()=>setShowLogs(false)}>Close</button>
      </div>

      <div className="container">
        <ul className="container">
          <li>Soon... update!</li>
        </ul>
      </div>
    </div>
  )
}

export default Logs
