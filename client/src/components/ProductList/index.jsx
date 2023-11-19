//ProductList
import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { UPDATE_SIZES } from '../../utils/actions';
import { ADD_TO_CART } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  

  const handleAddToCart = (selectedProduct, selectedSize) => {
    // Implement the logic to add items to the cart based on selected product and size
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    dispatch({
      type: ADD_TO_CART,
      product: { ...selectedProduct, selectedSize, purchaseQuantity: 1 },
    });

  };


  useEffect(() => {

    if (data) {
      const fetchedProducts = data.products || [];
      const fetchedSizes = fetchedProducts.reduce((sizes, product) => {
        // Assuming sizes are available as an array in each product
        if (product.sizes && Array.isArray(product.sizes)) {
          sizes.push(...product.sizes);
        }
        return sizes;
      }, []);

      dispatch({ type: UPDATE_SIZES, sizes: [...new Set(fetchedSizes)] }); // Dispatch action to update sizes
      dispatch({ type: UPDATE_PRODUCTS, products: fetchedProducts }); // Dispatch action to update products

      fetchedProducts.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2" style={{ position: 'relative', zIndex: '1' }}>

      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              sizes={product.sizes}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}

      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;