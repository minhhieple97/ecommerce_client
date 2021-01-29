import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getCategory } from '../../services/api/category'
import Spinner from '../../components/Spinner';
import ProductList from '../../components/product/ProductList';
const CategoryHome = ({ match, history }) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { slug } = match.params;
    useEffect(() => {
        setLoading(true);
        const _getData = async () => {
            try {
                setLoading(true)
                const { category,
                    products, } = await getCategory(slug);
                if (!category || products.length === 0) {
                    history.push('/')
                }
                setCategory(category);
                setProducts(products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error('Sorry something went wrong, please try again.')
            }
        }
        _getData()
    }, [slug, history])
    return <div className="container" >
        {loading ? <Spinner></Spinner> : <>
            <div className="row" >
                <div className="col" >
                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
                        {products.length} Products in '{category.name}' category
                    </h4>

                </div>
            </div>
            <div className="row" >
                <ProductList
                    products={products}
                ></ProductList>
            </div>
        </>}
    </div>
}
export default CategoryHome
