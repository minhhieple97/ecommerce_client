import React from 'react'
import { useHistory } from 'react-router-dom';
import Spinner from '../Spinner';
const CategoryList = ({ loading, categories }) => {
    const history = useHistory()
    const showCategories = () => {
        return categories.map((category) => {
            return <div onClick={() => {
                history.push(`/category/${category.slug}`)
            }} key={category._id} style={{ color: "cadetblue" }} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3" >
                {category.name}
            </div>
        })
    }
    return (
        <div className="container" >
            <div className="row" >
                {loading ? <Spinner></Spinner> : showCategories()}
            </div>
        </div>
    )
}
export default CategoryList
