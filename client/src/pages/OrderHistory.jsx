import { Link } from 'react-router-dom';
import './style.css';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  const linkStyle = {
    color: 'white', // Set your desired color here
    textDecoration: 'underline', // Remove the default underline
    
  };

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="order-container my-1">
        <Link to="/" style={linkStyle} >← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row m-5">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="custom-card-style ">
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
