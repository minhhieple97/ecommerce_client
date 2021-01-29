import React from 'react'

const ProductListSideDraw = ({ products }) => {
    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover'
    }
    return products.map(el => <div key={el._id} className="row" >
        <div className="col" >
            {el.images[0] ?
                <img src={el.images[0].imageUrl} alt="cover" style={imageStyle} ></img>
                :
                (<img src="/images/laptop.png" alt="cover" style={imageStyle} ></img>)

            }
            <p className="text-center bg-secondary text-light" >
                {el.title} x {el.count}
            </p>
        </div>
    </div>)
}

export default ProductListSideDraw
