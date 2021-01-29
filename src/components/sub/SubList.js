import React from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../Spinner';
const SubList = ({ loading, subCategories }) => {
    const history = useHistory()
    const showSubCategories = () => {
        return subCategories.map((category) => {
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
                {loading ? <Spinner></Spinner> : showSubCategories()}
            </div>
        </div>
    )
}
export default SubList
