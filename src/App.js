import React, {useState, useEffect} from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Posts from './Posts';
import CustomerList from './CustomerList';
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserList from './UserList';
import Login from './Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {


const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])


// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}
  
 
 return (
    <div className="App">


    {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

    { loggedInUser && 
      <Router>
      
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href='/customers'>Customers</Nav.Link>
                <Nav.Link href='/posts'>Some higlights</Nav.Link>
                <Nav.Link href='/users'>Users</Nav.Link>
                <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
                <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>
                        
        <h1>Northwind Corporation</h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Routes>
          <Route path="/customers"
          element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
          setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/users"
          element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} 
          setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/posts"
          element={<Posts />}>
          </Route>
          
          <Route path="/laskuri" 
          element={<Laskuri />}>
        </Route>
        
        </Routes>
      </Router>
      }
    </div>
  )
}

export default App;
