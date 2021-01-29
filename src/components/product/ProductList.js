import React from 'react'
import ProductCard from '../cards/ProductCard'
const ProductList = ({ products }) => {
    return products.map(product => {
        return <div key={product._id} className="col-md-4 mt-3" >
            <ProductCard product={product} ></ProductCard>
        </div>
    })
}
export default ProductList
