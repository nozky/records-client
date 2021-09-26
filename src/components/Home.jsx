import React, { useContext } from 'react'
import {useState, useEffect} from 'react'
import Search from '../components/Search'
import Add from '../components/Add'
import Records from '../components/Records';
import axios from 'axios'
import Loading from './Loading';
import { Context } from '../Contexts/Context';
import Logs from './Logs';

const apiUrl = process.env.REACT_APP_BASE_API

const Home = () => {

  const [option, setOption] = useState("search")
  const [toggleDelete, setToggleDelete] = useState(false)
  const [record, setRecord] = useState([])
  const [render, setRender] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const {setIsAuth,token} = useContext(Context)
  const [showLogs, setShowLogs] =useState(false)

  useEffect( ()=>{
    setIsLoading(true)
    const getData = async ()=> {
      try {
        const response = await axios.get(`${ apiUrl }/api/all`,{ params: {token: token } })
        setRecord( response.data.msg )
        setIsLoading(false)
      } catch (error) {
        console.log( error )
        setIsLoading(false)  
      }
    }
    getData()
  },[render])

  return (
    <>
      <div className="container">
        <button className="btn btn-outline-primary btn-sm" onClick={()=>{ setIsAuth( false ) }}>Sign Out</button>
      </div>
      <div className="container flex-space-around">
        <h2>Records</h2>
      </div>
      <div className="container border">
        { option ==="search" && <Search record={record} setRecord={setRecord}/> }
        { option ==="add" && <Add record={record} setRecord={setRecord} setRender={setRender}/> }
      </div>
      <div className="container border">
        <Records record={record} toggleDelete={toggleDelete} setRender={setRender}/>
      </div>
      <div className="container nav border flex-space-around">
          
          <button className={option === "search" ?"btn btn-info" : "btn btn-primary"} onClick={()=>{
            setOption("search")
            setRender(c => c + 1)
          }}>Records</button>
          
          <button className={option === "add" ?"btn btn-info" : "btn btn-primary"} onClick={()=>{setOption("add")}}>Insert</button>

          <button className={toggleDelete? "btn btn-danger" : "btn btn-warning"} onClick={()=>{setToggleDelete(!toggleDelete)}} >Delete</button>

          <button className="btn btn-dark" onClick={()=>{ setShowLogs( !showLogs) }}>Logs</button>

          {isLoading && <Loading />}
      </div>
          <Logs showLogs={showLogs} setShowLogs={setShowLogs}/>
    </>
  )
}

export default Home
