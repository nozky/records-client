import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Context } from '../Contexts/Context'

const Search = ({record, setRecord}) => {

  const [searchStr, setSearchStr] = useState("")
  const { token } = useContext(Context)
  const searchHandle = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API}/api/find`, { params:{name: searchStr, token: token} })

      setRecord( response.data.msg )
    } catch (error) {
      console.log( error )
    }
  }

  return (
    <div className="search container">
      <h3>Search customer</h3>
     <div className="flex-row mb-3">
       <button className="btn btn-primary" onClick={searchHandle}>Search</button>
       <input type="text" className="form-control" onChange={(e)=> setSearchStr(e.target.value)} />
    </div>
    </div>
  )
}

export default Search
