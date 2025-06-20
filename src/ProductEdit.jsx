import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

  // Komponentin tilojen määrittely
  const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
  const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit || "")
  const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice || "")
  const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock || "")
  const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder || "")
  const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel || "")
  const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
  const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink || "")
  const [newRpaProcessed, setNewRpaProcessed] = useState(muokattavaProduct.rpaprocessed || "")

  // Submit-handleri
  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedProduct = {
      productId: newProductId,
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

    ProductService.update(updatedProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage("Edited Product: " + updatedProduct.productName)
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
    <div id="edit" className="edit-container">
  <h2 className="edit-title">Product Edit</h2>

  <form onSubmit={handleSubmit} className="edit-form">
    <input type="text" value={newProductId} disabled className="edit-input disabled" />

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
      <input type="button" value="Back" onClick={() => setMuokkaustila(false)} className="btn-black" />
    </div>
  </form>
</div>
  )
}

export default ProductEdit
