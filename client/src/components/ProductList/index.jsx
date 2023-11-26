// ProductList Component: Renders the list of products
import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS, UPDATE_SIZES, ADD_TO_CART } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // Function to add items to the cart
  const handleAddToCart = (selectedProduct, selectedSize) => {
    // Check if a size is selected before adding to cart
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
      // Extract products and sizes from the fetched data
      const fetchedProducts = data.products || [];
      const fetchedSizes = fetchedProducts.reduce((sizes, product) => {
        if (product.sizes && Array.isArray(product.sizes)) {
          sizes.push(...product.sizes);
        }
        return sizes;
      }, []);

      // Dispatch actions to update sizes and products
      dispatch({ type: UPDATE_SIZES, sizes: [...new Set(fetchedSizes)] });
      dispatch({ type: UPDATE_PRODUCTS, products: fetchedProducts });

      // Store fetched products in indexedDB
      fetchedProducts.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // Fetch products from indexedDB if data is not available
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  // Function to filter products based on the current category
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
        <div className="flex-row mb-7">
          {/* Render the ProductItem component for each product */}
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

      {/* Show loading spinner if data is being fetched */}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
