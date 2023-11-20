import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_51OCLhXHu43R31z1b9ZHeM2mrp4xl05c4OxNKDXDcf9WrYMPuE2AcYwFI2QSIkxHzylb68J1vFNKr5hR1IhCBTfhu00WJCn4bX5');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({ sessionId: data.checkout.session })
          .then((result) => {
            if (result.error) {
              console.error(result.error.message);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    })
    .then((result) => {
      const { loading, error, data } = result;
  
      if (loading) {
        // Handle loading state if needed
      }
  
      if (error) {
        console.error(error.message);
        // Handle error state if needed
      }
  
      if (data) {
        // Process data if needed
        const stripe =  stripePromise;
        stripe.redirectToCheckout({ sessionId: data.checkout.session })
          .then((result) => {
            if (result.error) {
              console.error(result.error.message);
              // Handle error during redirection
            }
          })
          .catch((error) => {
            console.error(error.message);
            // Handle other errors during redirection
          });
      }
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed"  onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <img src="../images/Shopping-Cart-BLUE.png" style={{width: "80%"}}/>
        </span>
      </div>
    );
  }

  return (
    <div className="cart secondFont">
      <div className="close" onClick={toggleCart}>
        <img src='../images/x_icon.png'/>
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <a href="/login">(log in to check out)</a>
            )}
          </div>
        </div>
      ) : (
        <h5>
          No items added to cart.
        </h5>
      )}
    </div>
  );
};

export default Cart;
