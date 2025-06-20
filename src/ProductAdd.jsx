import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  // Tilojen määritys
  const [newProductName, setNewProductName] = useState('')
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
  const [newUnitPrice, setNewUnitPrice] = useState('')
  const [newUnitsInStock, setNewUnitsInStock] = useState('')
  const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
  const [newReorderLevel, setNewReorderLevel] = useState('')
  const [newDiscontinued, setNewDiscontinued] = useState(false)
  const [newImageLink, setNewImageLink] = useState('')
  const [newRpaProcessed, setNewRpaProcessed] = useState('')

  // Submit-käsittelijä
  const handleSubmit = (event) => {
    event.preventDefault()

    const newProduct = {
      productName: newProductName,
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      unitsOnOrder: parseInt(newUnitsOnOrder),
      reorderLevel: parseInt(newReorderLevel),
      discontinued: newDiscontinued,
      imageLink: newImageLink,
      rpaprocessed: newRpaProcessed
    }

    ProductService.create(newProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage("Added new Product: " + newProduct.productName)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setLisäystila(false)
        }
      })
      .catch(error => {
        setMessage(error.message || "Add failed")
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <div id="addNew" className="edit-container">
  <h2 className="edit-title">Product Add</h2>

  <form onSubmit={handleSubmit} className="edit-form">
    <input type="text" value={newProductName} placeholder="Product name"
      onChange={({ target }) => setNewProductName(target.value)} required className="edit-input" />

    <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
      onChange={({ target }) => setNewQuantityPerUnit(target.value)} className="edit-input" />

    <input type="number" step="0.01" value={newUnitPrice} placeholder="Unit price (€)"
      onChange={({ target }) => setNewUnitPrice(target.value)} className="edit-input" />

    <input type="number" value={newUnitsInStock} placeholder="Units in stock"
      onChange={({ target }) => setNewUnitsInStock(target.value)} className="edit-input" />

    <input type="number" value={newUnitsOnOrder} placeholder="Units on order"
      onChange={({ target }) => setNewUnitsOnOrder(target.value)} className="edit-input" />

    <input type="number" value={newReorderLevel} placeholder="Reorder level"
      onChange={({ target }) => setNewReorderLevel(target.value)} className="edit-input" />

    <label className="edit-label">
      <input type="checkbox" checked={newDiscontinued}
        onChange={({ target }) => setNewDiscontinued(target.checked)} />
      Discontinued
    </label>

    <input type="text" value={newImageLink} placeholder="Image link"
      onChange={({ target }) => setNewImageLink(target.value)} className="edit-input" />

    <input type="text" value={newRpaProcessed} placeholder="RPA processed"
      onChange={({ target }) => setNewRpaProcessed(target.value)} className="edit-input" />

    <div className="edit-buttons">
      <input type="submit" value="Save" className="btn-red" />
      <input type="button" value="Back" onClick={() => setLisäystila(false)} className="btn-black" />
    </div>
  </form>
</div>
  )
}

export default ProductAdd
