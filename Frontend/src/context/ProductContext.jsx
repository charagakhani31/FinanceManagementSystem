import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export const productContext =  createContext()

const ProductProvider = ({children}) => {

     const {user} = useAuth()

    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [product, setProduct] = useState(null)
    const [editingProduct, setEditingProduct] = useState(null)

    const filteredProducts = products.filter((product) => 
                   product.productName?.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

    async function getProducts() {
        try {

            const response = await axios.get('http://localhost:3000/api/products', { withCredentials: true})
                                      
            setProducts(response.data.products)

        } catch (error) {
            alert(error.response?.data?.message || error.message)
            
        }
    }

    async function addProduct(productName, sku, description, purchasePrice, sellingPrice, quantity) {
        try {

            const response = await axios.post('http://localhost:3000/api/product', {productName, sku,
                description, purchasePrice,
                sellingPrice, quantity
            }, { withCredentials: true})

             alert(response.data.message)
             setProduct(response.data.product)

             setProducts((prev) => [...prev, response.data.product])
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
    }

    async function deleteProduct(productID) {
            try {
    
            const response = await axios.delete(`http://localhost:3000/api/delete/products/${productID}`, {withCredentials: true})
    
               alert(response.data.message)
    
             if(response.status === 200 ) {
                setProducts((prev) => prev.filter((product) => product._id != productID))
             }
                
            } catch (error) {
                alert(error.response?.data?.message || error.message)
            }
        }

    async function editProduct(productID, {productName, description, purchasePrice, sellingPrice, quantity}) {
        try {

            const response = await axios.patch(`http://localhost:3000/api/update/products/${productID}`, 
                                  {productName, description, purchasePrice, sellingPrice, quantity},
                                   { withCredentials: true})

                           alert(response.data.message)
                         if(response.status === 200 ) {
                setProducts((prev) =>
                prev.map((product) =>
            product._id === productID ? {...product, productName, description, purchasePrice, sellingPrice, quantity} : product))
         }                       
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
        
    }

    useEffect(() => {
        if(user) {
            getProducts()
        }
    }, [user])


  return (
   <productContext.Provider value={{products, filteredProducts, searchQuery,
                                    setSearchQuery, addProduct,
                                    deleteProduct, editingProduct, setEditingProduct,
                                    editProduct}}>
    {children}
   </productContext.Provider>
  )
}

export default ProductProvider