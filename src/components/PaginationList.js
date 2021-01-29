import { Pagination } from 'antd'
import React from 'react'

const PaginationList = ({ page, totalPages, handleOnChange }) => {

    return (
        <Pagination defaultCurrent={page} total={totalPages * 10} onChange={handleOnChange} ></Pagination>
    )
}

export default PaginationList
