import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <>
      <Route {...rest} render={()=> {
        if({...rest}.isAuth){
          return <Component {...rest} />
        }else{
          return <Redirect to="/login"/>
        }
      }}/>
    </>
  )
}

export default ProtectedRoute
