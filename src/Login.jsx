import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

// Komponentin tilan määritys

const [Username, setUsername] = useState('')
const [Password, setPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
  event.preventDefault()

  const userForAuth = {
    username: Username,
    password: md5(Password)
  }

  LoginService.authenticate(userForAuth)
    .then(response => {
      if (response.status === 200) {
        const user = response.data

        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)

        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.username)

        setMessage(`Logged in as: ${user.username}`)
        setIsPositive(true)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 5000)
      }
    })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 


  return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={Username}
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={Password}
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="button-group">
          <button type="submit">Login</button>
          <button type="button" onClick={emptyFields}>Empty</button>
        </div>
      </form>
    </div>
  </div>
)
}

export default Login