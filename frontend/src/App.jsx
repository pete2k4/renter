import { useEffect, useState } from 'react'

import userServices from '../services/user.js'
import './App.css'



const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('effect')
    userServices
      .getAll()
      .then(response => {
        setUsers(response.data)
      })
  }, [])


  return (
    <>
      <p>hello there!</p>
      <button onClick={() => console.log('CLICK!')} >Sign in</button>
      {users.map(user => <p>{user.name}</p>)}
    </>
  )
}

export default App
