import { Link } from 'react-router-dom';
import './style.css';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  // Fetching user data with useQuery hook
  const { data } = useQuery(QUERY_USER);
  let user;

  // Inline style for link
  const linkStyle = {
    color: 'white', // Set your desired color here
    textDecoration: 'underline', // Remove the default underline
  };

  // If data exists, assign it to the user variable
  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="order-container my-1">
        {/* Link to navigate back to Products */}
        <Link to="/" style={linkStyle}>
          ← Back to Products
        </Link>

        {/* Check if user data exists */}
        {user ? (
          <>
            {/* Display user's order history */}
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                {/* Display order details */}
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row m-5">
                  {/* Display individual products in the order */}
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="custom-card-style">
                      {/* Link to view individual product */}
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
