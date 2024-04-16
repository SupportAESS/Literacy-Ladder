import React from 'react';
import { useParams } from 'react-router-dom';
const ProductDetail = () => {
    const {productId} = useParams();
    console.log("Inside");
    console.log(productId);
    // const productId = match;
    return (
        <div>
            {/* <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
            Display other product details */}
        </div>
    );
}


export default ProductDetail;
