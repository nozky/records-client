import { useContext,useState } from 'react'
import { Context } from '../Contexts/Context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const history = useHistory()
  const { isAuth,setIsAuth,token, setToken } = useContext(Context)
  const [passCode, setPassCode] = useState("")
  const[error, setError]=useState(null)

  const signIn = async (value)=>{
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}/login`,{ passcode: value})
    if(response.data.status){
      setToken( response.data.token )
      setIsAuth(true)
      setError(null)
      history.push("/")
    }else{
      setError("Something went wrong!")
      setIsAuth(false)
      setToken(null)
    }
  }

  return (
    <div className="login flex-center-screen full-screen">
      <h1>Records</h1>
      <div className="login-form border">
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="passcode" onChange={(e)=>{ setPassCode(e.target.value) }}/>
          <button className="btn btn-primary" onClick={()=> signIn(passCode) }>Sign In</button>
        </div>
        {error && <p style={{color: "red"}}> { error  }</p>}
      </div>
    </div>
  )
}

export default Login
