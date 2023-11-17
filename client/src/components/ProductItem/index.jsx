import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity,
    sizes,
  } = item;

  const { cart } = state;
  const [selectedSize, setSelectedSize] = useState(''); // State to store selected size

  const addToCart = () => {
    // Check if a size is selected
    if (!selectedSize) {
      console.log('Please select a size');
      return;
    }

    const itemInCart = cart.find((cartItem) => cartItem._id === _id && cartItem.selectedSize === selectedSize)

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        selectedSize: selectedSize,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1, selectedSize: selectedSize  }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1, selectedSize: selectedSize  });
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p className="productText">{name}</p>
      </Link>
      <div>

<select value={selectedSize} onChange={handleSizeChange}>
  <option value="">Select size</option>
  {sizes && sizes.length > 0 ? (
    sizes.map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))
  ) : (
    <option value="" disabled>Loading sizes...</option>
  )}
</select>

        <div className="secondFont">{quantity} {pluralize("item", quantity)} in stock</div>
        <span className="secondFont">${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
