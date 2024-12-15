import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
  /* useSelector - React hook that allows you to extract data from the Redux store state.
  The useSelector hook is a built-in hook provided by React Redux that allows you to subscribe to a part of the store 
  state and retrieve the data whenever the state changes. In this case, the hook is used to retrieve the array of cartItems 
  from the Redux store's state.*/
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0);
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  /**
   * The item object is read-only and its properties cannot be modified directly. 
   * We need to create a new object that updates the quantity, rather than modifying the original item object.
   * => Spread Operator: The ...item syntax creates a new object that copies all properties from item.
   * => Update Property: The quantity: item.quantity + 1 line updates the quantity property of the new object 
   *    without modifying the original item.
   */
  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1};
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    if(item.quantity == 1) {
      dispatch(removeItem(item));
      onRemoveFromCart(item); // Notify ProductList to reactivate the button from "Added to Cart" to "Add to Cart"
    } else {
      const updatedItem = { ...item, quantity: item.quantity - 1};
      dispatch(updateQuantity(updatedItem));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    onRemoveFromCart(item); // Notify ProductList to reactivate the button from "Added to Cart" to "Add to Cart"
  };

  // Calculate total cost based on quantity for a given item type
  const calculateTotalCost = (item) => {
    console.log("calculateTotalCost");
    let totalAmount = 0
    cart.forEach((itemInCart) => {
      if(item.name === itemInCart.name) {
        totalAmount =+ parseFloat(item.cost.substring(1)) * item.quantity
      }
    });
    console.log("totalAmount: " + totalAmount);
    return totalAmount;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


