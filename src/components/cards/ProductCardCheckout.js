import React from 'react'
import ModalImage from "react-modal-image";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ENUM_COLORS } from '../../ultil/constants'
const ProductCardCheckout = ({ product, handleOnChangeColor, handleCountProduct, handleRemoveCart }) => {
    const { title, price, brand, color, count, images, _id, quantity, shipping } = product;
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: 'auto' }} >
                        {
                            images.length ? <ModalImage
                                small={images[0].imageUrl}
                                large={images[0].imageUrl}
                                alt="cover"
                            /> : <ModalImage
                                    small={'/images/laptop.png'}
                                    large={'/images/laptop.png'}
                                    alt="cover"
                                />
                        }
                    </div>
                </td>
                <td>{title}</td>
                <td>{price}</td>
                <td>{brand}</td>
                <td><select
                    style={{ marginTop: '-10px' }}
                    onChange={(e) => handleOnChangeColor(e, _id)}
                    name="color"
                    className="form-control"
                    defaultValue={color}
                >
                    {
                        ENUM_COLORS.map(el => <option key={el} value={el}>{el}</option>)
                    }
                </select></td>
                <td className="text-center" >
                    <input style={{ marginTop: '-4px' }} type="number" className="form-control" value={count} min="1" onChange={(e) => handleCountProduct(e.target.value, _id, quantity)} ></input>
                </td>
                <td className="text-center" >{shipping ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}</td>
                <td>
                    <CloseCircleOutlined className="text-danger pointer" onClick={() => handleRemoveCart(_id)} ></CloseCircleOutlined>
                </td>
            </tr>
        </tbody>
    )
}
export default ProductCardCheckout
