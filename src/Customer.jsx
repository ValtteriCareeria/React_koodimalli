import './App.css';
import React, {useState} from 'react'
import CustomerService from './services/Customer';

const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys

const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = (customer) => {
    let vastaus = window.confirm(`Remove Customer ${customer.companyName}`)

    if ( vastaus === true){
        
    CustomerService.remove(customer.customerId)
        .then(res => {
            if (res.status === 200){
                setMessage(`Successfully removed customer ${customer.companyName}`)
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
               

  return (
    <div className='custDiv'>
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {customer.companyName} 
        </h4>
        {showDetails && <div className="customerDetails">

                <h3>{customer.companyName}</h3>

                <button onClick={() => deleteCustomer(customer)}>Delete</button>
                <button onClick={() => {editCustomer(customer); window.scrollTo({ top: 0, behavior: 'smooth' });}}>Edit</button>
        
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table></div>}

       
      
    </div>
  )
}

export default Customer