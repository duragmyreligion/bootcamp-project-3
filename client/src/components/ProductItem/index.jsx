// ProductItem Component: Renders an individual product item
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem({ _id, image, name, price, quantity, sizes, onAddToCart }) {
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const [selectedSize, setSelectedSize] = useState('');

  // Function to add the product to the cart
  const addToCart = () => {
    if (!selectedSize) {
      console.log('Please select a size');
      return;
    }

    const itemInCart = cart.find(
      (cartItem) => cartItem._id === _id && cartItem.selectedSize === selectedSize
    );

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
        product: {
          _id,
          image,
          name,
          price,
          quantity,
          selectedSize,
          purchaseQuantity: 1,
        },
      });
      idbPromise('cart', 'put', {
        _id,
        image,
        name,
        price,
        quantity,
        selectedSize,
        purchaseQuantity: 1,
      });
    }
  };

  // Function to handle size change in the dropdown
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="card px-1 py-1 productText">
      {/* Product Image and Name */}
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p className="productText">{name}</p>
      </Link>

      {/* Size selection */}
      <div>
        <img
          className="priceImg"
          src="/images/price.png"
          alt="New World Gear"
        ></img>
        <select
          className="mb-2 rounded"
          value={selectedSize}
          onChange={handleSizeChange}
        >
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

        {/* Price and Add to Cart button */}
        <span className="priceFont">${price}</span>
        <button
          className="addCart productText"
          onClick={() =>
            onAddToCart({ _id, image, name, price, quantity }, selectedSize)
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
