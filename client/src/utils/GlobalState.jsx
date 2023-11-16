import React, { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    sizes:[],
    });

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
