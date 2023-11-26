import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;
  const [selectedSize, setSelectedSize] = useState('');

  // Function to handle size change in the product detail page
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  // Function to add the current product to the cart
  const addToCart = () => {
    // Validation for selecting a size before adding to cart
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Check if the item is already in the cart
    const itemInCart = cart.find(
      (cartItem) =>
        cartItem._id === id && cartItem.selectedSize === selectedSize
    );

    if (itemInCart) {
      // If item exists in cart, update its quantity
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        selectedSize: selectedSize,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      // If item doesn't exist in cart, add it to the cart
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1, selectedSize },
      });
      idbPromise('cart', 'put', {
        ...currentProduct,
        purchaseQuantity: 1,
      });
    }
  };

  // Function to remove the current product from the cart
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  // Effect to handle data fetching and setting currentProduct
  useEffect(() => {
    const createSimplifiedProduct = (product) => {
      const { _id, name, description, price, quantity, image, sizes } = product;
      return {
        _id,
        name,
        description,
        price,
        quantity,
        image,
        sizes,
        purchaseQuantity: 1,
      };
    };

    if (products.length) {
      const foundProduct = products.find((product) => product._id === id);
      setCurrentProduct(createSimplifiedProduct(foundProduct));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      const foundProduct = data.products.find((product) => product._id === id);
      setCurrentProduct(createSimplifiedProduct(foundProduct));
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
      const foundProduct = indexedProducts.find((product) => product._id === id);
      setCurrentProduct(createSimplifiedProduct(foundProduct));
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <div className="item">
            <Link to="/" className="productLink">
              ← Back to Products
            </Link>
            {/* Product details */}
            <h2 className='mt-5'>{currentProduct.name}</h2>
            <p>{currentProduct.description}</p>
            <p className='secondFont'>
              <strong>Price:</strong>${currentProduct.price}{' '}
              {/* Select size dropdown */}
              <select value={selectedSize} onChange={handleSizeChange}>
                <option value="">Select size</option>
                {currentProduct.sizes && currentProduct.sizes.length > 0 ? (
                  currentProduct.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Loading sizes...</option>
                )}
              </select>
              {/* Add to cart and remove from cart buttons */}
              <button style={{ fontWeight: 'bold' }} onClick={addToCart}>
                Add to Cart
              </button>
              <button
                style={{ fontWeight: 'bold' }}
                disabled={!cart.find((p) => p._id === currentProduct._id)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            </p>
            <img src={`/images/${currentProduct.image}`} alt={currentProduct.name} />
          </div>
        </div>
      ) : null}
      {/* Loading spinner */}
      {loading ? <img src={spinner} alt="loading" /> : null}
      {/* Cart component */}
      <Cart />
    </>
  );
}

export default Detail;
