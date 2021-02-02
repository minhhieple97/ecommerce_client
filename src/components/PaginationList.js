import { Pagination } from "antd";
import React from "react";

const PaginationList = ({ page, totalPages, handleOnChange, simple }) => {
  return (
    <Pagination
      defaultCurrent={page}
      total={totalPages * 10}
      onChange={handleOnChange}
      simple={simple}
    ></Pagination>
  );
};

export default PaginationList;
