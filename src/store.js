import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // The cartReducer from the CartSlice.jsx file which is imported, manages the state slice related to the shopping cart.
 
/**
 * Configuring the Store:
        => The configureStore() function is used to setup the Redux store.
        => Inside the configuration object passed to configureStore(), the reducer key specifies the reducer functions. 
           In this case, the cartReducer is assigned to manage the cart slice of the state.
 */
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store // The configured Redux store is exported using export default store, 
                     // so it can be used throughout the application to manage state.
