
import { useState } from 'react'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import './App.css';
import {Context} from './Contexts/Context'

function App() {

  const [isAuth, setIsAuth] =useState(false)
  const [token, setToken] = useState(null)

  return (
    <Context.Provider value={{isAuth,setIsAuth, token, setToken}}>
      <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={ Home } isAuth={isAuth} />
          <Route path="/login" component={ Login } />
          <Route path="*" component={ PageNotFound } />
        </Switch>
      </Router>
    </div>
    </Context.Provider>
  );
}

export default App;
