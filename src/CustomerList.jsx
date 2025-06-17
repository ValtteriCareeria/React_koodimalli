import './App.css';
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer';
import Customer from './Customer';

const CustomerList = () => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)

useEffect(() => {
    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    })
  },[]
  )

  return (
    <>
        <h1 onClick={() => setShowCustomers(!showCustomers)}>Customers</h1>

        {
            showCustomers && customers && customers.map(c => (
                <Customer key={c.customerId} customer={c} />
            )

            )
        }

       
      
    </>
  );
}

export default CustomerList