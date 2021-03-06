import React from "react";
import LoadingCard from "../cards/LoadingCard";
import PaginationList from "../PaginationList";
import ProductList from "../product/ProductList";
const BestSellers = ({ loading, data, handleOnChange, loadingPaganition }) => {
  const { products, page, totalPages } = data;
  return (
    <React.Fragment>
      <div className="container">
        {loading ? (
          <LoadingCard count={3}></LoadingCard>
        ) : (
          <div className="row">
            <ProductList products={products}></ProductList>
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          {totalPages !== 0 && !loadingPaganition && (
            <PaginationList
              handleOnChange={(page) => handleOnChange(page, "BESTSELLER")}
              page={page}
              totalPages={totalPages}
              simple={false}
            />
          )}
        </nav>
      </div>
    </React.Fragment>
  );
};
export default BestSellers;
