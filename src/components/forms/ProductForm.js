import { Button, Select } from "antd";
import React from "react";
import Spinner from "../Spinner";
import FileUpload from "./FileUpload";
const ProductForm = ({
  product,
  handleChange,
  loading,
  handleSubmit,
  listSub,
  handleChangeSubs,
  listCategory,
  handleFileChange,
  handleRemoveImage,
  initSubs,
  isUpdate,
  loadingUpload
}) => {
  const {
    title,
    description,
    price,
    quantity,
    colors,
    color,
    brands,
    subs,
    images,
    brand,
    category,
    shipping,
  } = product;
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          min="1"
          max="1000000"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          min="1"
          max="1000000"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping">Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping}
        >
          <option value="null">Please select value</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <select name="color" className="form-control" value={color} onChange={handleChange}>
          <option>Please select value</option>
          {colors.map((el) => {
            return (
              <option key={el} value={el}   >
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="brand">Brand</label>
        <select name="brand" className="form-control" onChange={handleChange} value={brand} >
          <option>Please select value</option>
          {brands.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Category</label>
        {listCategory.length > 0 && (
          <select
            onChange={handleChange}
            className="form-control"
            name="category"
            value={category && category._id}
          >
            <option value="0">Please select value</option>
            {listCategory.map((el) => {
              return (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      {listSub.length > 0 ? (
        <div className="form-group">
          <label htmlFor="title">Sub category</label>
          {
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              name="subs"
              value={isUpdate ? initSubs : subs}
              onChange={handleChangeSubs}
            >
              {listSub.map((sub) => {
                return (
                  <React.Fragment key={sub._id}>
                    <Select.Option value={sub._id}>{sub.name}</Select.Option>
                  </React.Fragment>
                )
              }
              )}
            </Select>
          }
        </div>
      ) : null
      }
      <div className="p-3">
        {(loading || loadingUpload) ? <Spinner></Spinner> : <FileUpload
          images={images}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
        ></FileUpload>}
      </div>
      <Button disabled={loading || loadingUpload} onClick={handleSubmit} type="primary">
        Submit
      </Button>
    </form >
  );
};

export default ProductForm;
