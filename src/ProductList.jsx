import './App.css'
import React, { useState, useEffect } from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({ setMessage, setIsPositive, setShowMessage }) => {
    
  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState(false)
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    ProductService.setToken(token)

    ProductService.getAll()
      .then(data => {
        setProducts(data)
      })
  }, [lisäystila, reload, muokkaustila])

  const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
  }

  const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
  }

 return (
  <div className="product-page">
    <div className="product-top-bar">
  <h1
    className="clickable-title"
    onClick={() => setShowProducts(!showProducts)}
  >
    Products
  </h1>

  {!lisäystila && (
    <input className="search-input" placeholder="Search by product name" value={search} onChange={handleSearchInputChange}/>
  )}

  {!lisäystila && (
    <button className="btn-add" onClick={() => setLisäystila(true)}>
      Add New
    </button>
  )}
</div>

    {lisäystila && (
      <ProductAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
    )}

    {muokkaustila && (
      <ProductEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaProduct={muokattavaProduct}/>
    )}

    {!lisäystila &&
      !muokkaustila &&
      showProducts &&
      products &&
      products.map((p) => {
        const lowerCaseName = p.productName.toLowerCase();
        if (lowerCaseName.includes(search)) {
          return (
            <Product
              key={p.productId}
              product={p}
              reloadNow={reloadNow}
              reload={reload}
              setIsPositive={setIsPositive}
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              editProduct={editProduct}
            />
          );
        }
        return null;
      })}
  </div>
);
}

export default ProductList