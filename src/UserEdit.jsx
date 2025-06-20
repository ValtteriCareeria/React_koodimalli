import './App.css'
import React, { useState } from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserEdit = ({ user, setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser }) => {

  // Komponentin tilojen määrittely käyttäjän muokkaukseen
const [userId, setUserId] = useState(muokattavaUser.userId)
const [firstname, setFirstname] = useState(muokattavaUser.firstName || "")
const [lastname, setLastname] = useState(muokattavaUser.lastName || "")
const [email, setEmail] = useState(muokattavaUser.email || "")
const [accesslevelId, setAccesslevelId] = useState(muokattavaUser.accesslevelId || 2)
const [username, setUsername] = useState(muokattavaUser.username || "")
const [password, setPassword] = useState("") // jätetään tyhjäksi turvallisuussyistä

  const handleSubmit = (event) => {
  event.preventDefault()

  const updatedUser = {
    userId: userId,
    firstName: firstname,
    lastName: lastname,
    email: email,
    accesslevelId: parseInt(accesslevelId),
    username: username
  }

  // Lisää salasana vain jos kenttä ei ole tyhjä
  if (password.trim() !== "") {
    updatedUser.password = md5(password)
  }

    UserService.update(updatedUser)
      .then(response => {
        if (response.status === 200) {
          setMessage("Edited Product: " + updatedUser.firstName)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setMuokkaustila(false)
        }
      })
      .catch(error => {
        setMessage(error.message || "Update failed")
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <div id="editUser" className="edit-container">
  <h2 className="edit-title">Edit User</h2>

  <form onSubmit={handleSubmit} className="edit-form">
    <input type="text" value={userId} disabled className="edit-input" />

    <input type="text" value={firstname} placeholder="First name"
      onChange={({ target }) => setFirstname(target.value)} required className="edit-input" />

    <input type="text" value={lastname} placeholder="Last name"
      onChange={({ target }) => setLastname(target.value)} required className="edit-input" />

    <input type="email" value={email} placeholder="Email"
      onChange={({ target }) => setEmail(target.value)} className="edit-input" />

    <input type="number" value={accesslevelId} placeholder="Access level"
      onChange={({ target }) => setAccesslevelId(target.value)} className="edit-input" />

    <input type="text" value={username} placeholder="Username"
      onChange={({ target }) => setUsername(target.value)} className="edit-input" />

    <input type="password" value={password} placeholder="New password (leave blank to keep old)"
      onChange={({ target }) => setPassword(target.value)} className="edit-input" />

    <div className="edit-buttons">
      <input type="submit" value="Save" className="btn-red" />
      <input type="button" value="Back" onClick={() => setMuokkaustila(false)} className="btn-black" />
    </div>
  </form>
</div>
  )
}

export default UserEdit
