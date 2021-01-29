import React from 'react'
import AdminProductCard from '../cards/AdminProductCard';
const AdminProductList = ({ products, handleRemove }) => {
    return products.map((prod) => {
        return (
            <div key={prod._id} className="col-md-4 pb-3">
                <AdminProductCard
                    product={prod}
                    handleRemove={handleRemove}
                ></AdminProductCard>
            </div>
        );
    })

}

export default AdminProductList
