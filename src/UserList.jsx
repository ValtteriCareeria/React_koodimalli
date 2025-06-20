import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'


const UserList = ({user, setMessage, setIsPositive, setShowMessage}) => {


// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")


const deleteUser = (user) => {
  let vastaus = window.confirm(`Remove User ${user.firstName}`)
  
      if ( vastaus === true){
          
      UserService.remove(user.userId)
          .then(res => {
              if (res.status === 200){
                  setMessage(`Successfully removed user ${user.firstName}`)
                  setIsPositive(true)
                  setShowMessage(true)
                  window.scrollBy(0, -10000) 
                   setTimeout(() => {
          setShowMessage(false)
         }, 5000)
         reloadNow(!reload)
         
      }
  
        })
        .catch(error => {
          setMessage(error.message) // Korjattu 1.4.2025! Error on objekti (Axios error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000) 
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        })
      }
       else {
      setMessage('Poisto peruttu onnistuneesti.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) 
  
          // Ilmoituksen piilotus
          setTimeout(() => {
          setShowMessage(false)},
          5000
          )
      }
   }


//UseEffect ajetaan aina alussa kerran
useEffect(() => {
  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

  return (
        <>
            <h1><nobr>Users</nobr>

            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
            }
            {muokkaustila &&
            <UserEdit 
                user={user} 
                muokattavaUser={muokattavaUser} 
                setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive}
                setMessage={setMessage} 
                setShowMessage={setShowMessage} 
            />}

            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>

        
                {users && users.map(u =>
                {
                    const lowerCaseName = u.lastName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.userId}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.accesslevelId}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => deleteUser(u)}>Delete</button></td>
                                <td><button className="btn btn-sm btn-primary" onClick={() => editUser(u)}>Edit</button></td>
                            </tr>
                            
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default UserList