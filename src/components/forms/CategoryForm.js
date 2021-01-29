import React from "react";
import { Button } from "antd";
const CategoryForm = ({ handleSubmit, loading, name, handleOnChange, category }) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name || ""}
          disabled={loading}
          className="form-control"
          placeholder=""
          aria-describedby="helpId"
          autoFocus
          required
          onChange={handleOnChange}
        />
        <br></br>
        <Button
          disabled={!name || name.length < 1 || name.length > 200 || loading}
          loading={loading}
          type="primary"
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
