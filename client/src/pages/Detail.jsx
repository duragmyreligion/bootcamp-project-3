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

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const itemInCart = cart.find((cartItem) => cartItem._id === id && cartItem.selectedSize === selectedSize);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        selectedSize: selectedSize, // Add selectedSize to identify the correct item
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      console.log('UPDATE CART Q');
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      console.log('UPDATE CART Q Promise');
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1, selectedSize: selectedSize },
      });
      console.log(`CURRENT: ${currentProduct}`);
      console.log('ADD TO CART');
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
    idbPromise('cart', 'delete', { ...currentProduct });
  };

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
      setCurrentProduct(createSimplifiedProduct(foundProduct)); // Set currentProduct after fetching data
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
      const foundProduct = indexedProducts.find((product) => product._id === id);
      setCurrentProduct(createSimplifiedProduct(foundProduct)); // Set currentProduct from indexedProducts
    }
  }, [products, data, loading, dispatch, id]);

  return (

    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <div className="item">
          <Link to="/" className="productLink">← Back to Products</Link>
            <h2 className='mt-5'>{currentProduct.name}</h2>
            <p>{currentProduct.description}</p>
            <p className='secondFont'>
              <strong>Price:</strong>${currentProduct.price}{' '}
            
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

            <button style={{ fontWeight: 'bold' }} onClick={addToCart}>Add to Cart</button>
            <button
              style={{ fontWeight: 'bold' }}
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>
          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}
export default Detail;