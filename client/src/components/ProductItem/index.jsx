//ProductItem
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
// import { UPDATE_SIZES } from '../../utils/actions';

function ProductItem({ _id, image, name, price, quantity, sizes, onAddToCart }) {
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const [selectedSize, setSelectedSize] = useState('');


  const addToCart = () => {
    if (!selectedSize) {
      console.log('Please select a size');
      return;
    }

    const itemInCart = cart.find((cartItem) => cartItem._id === _id && cartItem.selectedSize === selectedSize);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        selectedSize: selectedSize,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { _id, image, name, price, quantity, selectedSize, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { _id, image, name, price, quantity, selectedSize, purchaseQuantity: 1 });
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (

    
    <div className="card px-1 py-1 productText">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p className='productText'>{name}</p>
      </Link>
      <div>
      <img className='priceImg' src="/images/price.png" alt="New World Gear"></img>

        <select className='mb-2 rounded' value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select size</option>
          {sizes && sizes.length > 0 ? (
            sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No sizes available
            </option>
          )}
        </select>
        {/* <div className="secondFont">
          {quantity} {pluralize('item', quantity)} in stock
        </div> */}
        <span className="priceFont">${price}</span>
        
      </div>
      <button className='addCart productText' onClick={() => onAddToCart({ _id, image, name, price, quantity }, selectedSize)}>
  Add to cart
</button>
    </div>
  );
}

export default ProductItem;
