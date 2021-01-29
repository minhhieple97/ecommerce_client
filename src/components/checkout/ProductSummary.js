import React from "react";

const ProductSummary = ({ products }) => {
  return products.map((prod, i) => (
    <div key={i}>
      <p>
        {prod.product.title} ({prod.color}) x {prod.count} ={" "}
        {prod.product.price * prod.count}
      </p>
    </div>
  ));
};

export default ProductSummary;
