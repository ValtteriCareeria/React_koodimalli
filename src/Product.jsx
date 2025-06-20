import './App.css';
import React, {useState} from 'react'
import ProductService from './services/Product'

const Product = ({product, reloadNow, reload, setIsPositive, setMessage, setShowMessage, editProduct }) => {


  const deleteProduct = (product) => {
  let vastaus = window.confirm(`Remove Customer ${product.productName}`)
  
      if ( vastaus === true){
          
      ProductService.remove(product.productId)
          .then(res => {
              if (res.status === 200){
                  setMessage(`Successfully removed customer ${product.productName}`)
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
  <div className="card product-card" style={{ width: '20rem', margin: '1rem', display: 'inline-block', verticalAlign: 'top' }}>
    <div className="card-body">
      <h5 className="card-title">{product.productName}</h5>
      <p className="card-text">
        <strong>Quantity per unit:</strong> {product.quantityPerUnit || 'N/A'}<br />
        <strong>Unit price:</strong> {product.unitPrice ? `${product.unitPrice} €` : 'N/A'}<br />
        <strong>In stock:</strong> {product.unitsInStock ?? 'N/A'}<br />
        <strong>On order:</strong> {product.unitsOnOrder ?? 'N/A'}<br />
        <strong>Reorder level:</strong> {product.reorderLevel ?? 'N/A'}<br />
        <strong>Discontinued:</strong> {product.discontinued ? 'Yes' : 'No'}<br />
        <strong>RPA processed:</strong> {product.rpaprocessed || 'N/A'}
      </p>
      <div className="btn-group">
        <button className="btn btn-sm btn-primary" onClick={() => editProduct(product)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product)}>Delete</button>
      </div>
    </div>
  </div>
)
}

export default Product
