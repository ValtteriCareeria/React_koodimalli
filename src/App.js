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
import ProductList from './ProductList';
import { NavLink } from 'react-router-dom'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {


const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState(null)

useEffect(() => {
  const storedUsername = localStorage.getItem("username")
  if (storedUsername) {
    setLoggedInUser(storedUsername)
  }
}, [])


// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser(null)
}
  
return (
  <div className="App">

    {!loggedInUser && (
      <Login 
        setMessage={setMessage}
        setIsPositive={setIsPositive}
        setShowMessage={setShowMessage}
        setLoggedInUser={setLoggedInUser}
      />
    )}

    {loggedInUser && 
      <Router>
        <div className="main-container">
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <NavLink to='/customers' className="nav-link">Customers</NavLink>
              <NavLink to='/posts' className="nav-link">Some highlights</NavLink>
              <NavLink to='/users' className="nav-link">Users</NavLink>
              <NavLink to='/laskuri' className="nav-link">Laskuri</NavLink>
              <NavLink to='/products' className="nav-link">Products</NavLink>
              <button className="logout-button" onClick={logout}>Logout</button>
            </Nav>
          </Navbar>
              
          <h1>Northwind Corporation</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route path="/customers" element={
              <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
            <Route path="/products" element={
              <ProductList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
            <Route path="/users" element={
              localStorage.getItem("accesslevelId") === "1"
              ? <UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />
              : <p style={{color: 'red'}}>Access denied. Only admins can view this page.</p>
            } />
            <Route path="/posts" element={<Posts />} />
            <Route path="/laskuri" element={<Laskuri />} />
          </Routes>
        </div>
      </Router>
    }
  </div>
)


}

export default App;
