import axios from 'axios'
import React, { useContext, useState } from 'react'
import Loading from './Loading'
import {Context} from '../Contexts/Context'

const Add = ({record, setRecord, setRender}) => {

  const{ token } = useContext(Context)
  const [data, setData] = useState({name: "", info: ""})
  const [isLoading, setIsLoading] = useState( false )

  const addHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/api/add`, {...data, token: token})
      setIsLoading(false)
      setRender( c => c+1)
    } catch (error) {
      setIsLoading(false)
      alert('Something went wrong!')
      console.log( error )
      
    }
  }


  return (
    <div className="add container">
      
      <h3>Add Customer</h3>
       
      <div className="input-group mb-3">
        <span className="input-group-text" >Name</span>
        <input type="text" className="form-control" onChange={(e)=> setData( c => ( {...c, name: e.target.value} )) }/>
      </div>
      
      <div className="input-group mb-3">
        <span className="input-group-text" >Info</span>
        <input type="text" className="form-control" onChange={(e)=> (setData( c => ( {...c, info: e.target.value} ))) }/>
      </div>
      
      <button className="btn btn-primary" onClick={()=>{
        addHandler()
        setRender( c => c+1)
      }}>Add</button>
      {isLoading && <Loading />}
    </div>
  )
}

export default Add
