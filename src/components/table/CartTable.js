import React from 'react'
import ProductCardCheckout from '../cards/ProductCardCheckout'
const CartTable = ({ products, handleOnChangeColor, handleCountProduct, handleRemoveCart }) => {
    return (
        <table className="table table-bordered" >
            <thead className="thead-light" >
                <tr>
                    <th scope="col" >Image</th>
                    <th scope="col" >Title</th>
                    <th scope="col" >Price</th>
                    <th scope="col" >Brand</th>
                    <th scope="col" >Color</th>
                    <th scope="col" >Count</th>
                    <th scope="col" >Shipping</th>
                    <th scope="col" >Remove</th>
                </tr>
            </thead>
            {products.map((prod, i) => {
                return <ProductCardCheckout handleOnChangeColor={handleOnChangeColor} handleCountProduct={handleCountProduct} handleRemoveCart={handleRemoveCart} product={prod} key={prod._id} >
                </ProductCardCheckout>
            })}
        </table>
    )
}
export default CartTable
