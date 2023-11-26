import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  // useEffect to perform actions after component mounts
  useEffect(() => {
    async function saveOrder() {
      // Retrieve cart items from IndexedDB
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        // Add order to the database via GraphQL mutation
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        // Remove purchased items from the cart in IndexedDB
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      // Redirect to the home page after a delay
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]); // Dependency array to run the effect when 'addOrder' changes

  return (
    <div>
      <Jumbotron>
        {/* Display success message */}
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
