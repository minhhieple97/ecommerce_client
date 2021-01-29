import React from "react";

const LocalSearch = ({ keyword, handleSearch }) => {
  return (
    <div className="container pt-4 pb-4">
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearch}
        className="form-control mb-4"
      ></input>
    </div>
  );
};

export default LocalSearch;
