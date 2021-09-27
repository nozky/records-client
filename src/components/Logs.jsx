import React,{ useEffect } from 'react'

const Logs = ({showLogs,setShowLogs,logs}) => {

  return (
    <div className={showLogs? "logs logs-show" : "logs"} >
      <div className="container flex-row flex-space-around">
        <h1>logs</h1>
        <button className="btn btn-outline-light" onClick={()=>setShowLogs(false)}>Close</button>
      </div>

      <div className="container">
        <ul className="container">
          {logs.map(( person, idx)  => <li className="container ">{person.log}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Logs
