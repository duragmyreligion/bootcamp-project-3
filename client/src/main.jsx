import ReactDOM from 'react-dom/client'; // Importing ReactDOM from React
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importing necessary components from react-router-dom
import './index.css'; // Importing CSS styles

import App from './App.jsx'; // Importing main App component
import Home from './pages/Home'; // Importing Home component
import Detail from './pages/Detail'; // Importing Detail component
import NoMatch from './pages/NoMatch'; // Importing NoMatch component
import Login from './pages/Login'; // Importing Login component
import Signup from './pages/Signup'; // Importing Signup component
import OrderHistory from './pages/OrderHistory'; // Importing OrderHistory component
import Success from './pages/Success'; // Importing Success component

// Creating a router using createBrowserRouter from react-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Element to be rendered for the '/' route
    errorElement: <NoMatch />, // Element to be rendered in case of error or no match
    children: [
      {
        index: true,
        element: <Home /> // Element to be rendered for the '/' route (Home component)
      }, {
        path: '/login',
        element: <Login /> // Element to be rendered for the '/login' route
      }, {
        path: '/signup',
        element: <Signup /> // Element to be rendered for the '/signup' route
      }, {
        path: '/orderHistory',
        element: <OrderHistory /> // Element to be rendered for the '/orderHistory' route
      }, {
        path: '/products/:id',
        element: <Detail /> // Element to be rendered for the '/products/:id' route
      }, {
        path: '/success',
        element: <Success /> // Element to be rendered for the '/success' route
      },
    ],
  },
]);

// Rendering the RouterProvider component using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Providing the router to RouterProvider
);
