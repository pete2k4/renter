import { useEffect, useState } from 'react'
import userServices from '../services/user'
import Login from './Login';
import Register from './Register';
import axios from 'axios';




const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('effect')
    userServices
      .getAll()
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get('/auth/check')
      .then(response => {
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error checking authentication', error);
      });
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    {isAuthenticated ? (<h1>HELLO {user.name}</h1>) : <h1>Hello stranger</h1>}
      
      <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {isLogin ? <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
      : <Register />}
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>

      <button onClick={() => console.log('CLICK!')} >Sign in</button>
      {users.map(user => <p>{user.name}</p>)}
    </>
  )
}

export default App
