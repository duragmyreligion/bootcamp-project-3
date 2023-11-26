// Import necessary modules from libraries
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Import custom components and utilities
import Nav from './components/Nav';
// import Footer from './components/Footer'
import { StoreProvider } from './utils/GlobalState';

// Create a HTTP link to connect to the GraphQL API
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set context for authentication token to be included in the headers
const authLink = setContext((_, { headers }) => {
  // Retrieve token from local storage
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Include token in the authorization header if available
    },
  };
});

// Create an instance of ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Connect the HTTP link and authentication link
  cache: new InMemoryCache(), // Use an in-memory cache for ApolloClient
});

// Main App component
function App() {
  return (
    <ApolloProvider client={client}> {/* Provide ApolloClient instance to the app */}
      <div>
        <StoreProvider> {/* Wrap the components in StoreProvider for state management */}
          <Nav /> {/* Include the navigation component */}
          <Outlet /> {/* Display the routes defined in React Router */}
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App; // Export the App component as the default export
