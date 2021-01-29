import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Button } from 'antd';
import { toggleSideDraw } from '../../store/actions';
import ProductListSideDraw from './ProductListSideDraw';
import { Link } from 'react-router-dom';
const Draw = () => {
    const dispatch = useDispatch();
    const { toggle, cart } = useSelector(state => ({ ...state }));
    const { products } = cart
    return <Drawer closable={false} className="text-center" title={`Cart / ${products.length}`} onClose={() => dispatch(toggleSideDraw(false))} visible={toggle} ><ProductListSideDraw products={products} ></ProductListSideDraw>
        <Link to="/cart">
            <Button onClick={() => dispatch(toggleSideDraw(false))} className="text-center btn btn-primary btn-raised btn-block"  >Go to cart</Button>
        </Link>
    </Drawer>
}
export default Draw
