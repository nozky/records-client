import React, { useContext, useState } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { Context } from '../Contexts/Context'


// trying ways to pass/recieve data through req/res obj, i know there is standard but i am hacking.. :) 
const Records = ({record, toggleDelete, setRender}) => {

  const[ isLoading, setIsloading] = useState(false)
  const{token} = useContext(Context)

  const log = async (name)=> {
    setIsloading(true)
    const config={ headers: { authorization: `Bearer ${token}`  }  }
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}/log`,{ log: `${name} - ${Date().toLocaleString("en-US", {timeZone: "America/Edmunton"})}` }, config)
    setIsloading(false)
  }

  const removeRecord = async (id)=> {
    setIsloading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/api/remove`, { id,token } )
      if(response.statusText){
        setRender(c => c+1)
        setIsloading(false)
      }
    } catch (error) {
      console.log( error )
      setIsloading(false)
    }
  }

  return (
    <div className="records container border ">
      <ul className="list-group scroll">
        { record.map( (person) => {
          return(
            <li className="record-list list-group-item" key={person._id} >
              <p>{person.name}</p>
              <p>{person.info}</p>
              <button className="btn btn-sm btn-outline-primary" onClick={()=> { log(person.name)} }>Log</button>
              <button className={ toggleDelete? "btn btn-sm btn-outline-danger" : "hide" } onClick={()=> removeRecord( person._id)} >Remove</button>
            </li>
          )
        }) }
      </ul>
      {isLoading && <Loading />}
    </div>
  )
}

export default Records
