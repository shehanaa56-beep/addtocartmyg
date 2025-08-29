// src/App.js
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import products from "./products";
import "./App.css";

function Navbar() {
  const cart = useSelector(state => state.cart);
  const itemCount = cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <header className="navbar app">
      <h2>🛍️ MyG Store</h2>
      <div className="cart-badge">
        Cart: <span className="count">{itemCount}</span>
      </div>
    </header>
  );
}

function ProductList() {
  const dispatch = useDispatch();

  return (
    <section className="app">
      <h2>Products</h2>
      <div className="grid">
        {products.map(prod => (
          <div className="card" key={prod.id}>
            <img src={prod.img} alt={prod.name} />
            <h3>{prod.name}</h3>
            <p>₹{prod.price}</p>
            <button
              className="btn btn-primary"
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: prod })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function CartPage() {
  const { cart, total } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <section className="app">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <div>
              <span className="item-name">{item.name}</span> - ₹{item.price}
              <div className="qty">
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    item.qty > 1 &&
                    dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: item.qty - 1 } })
                  }
                >
                  ➖
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: item.qty + 1 } })
                  }
                >
                  ➕
                </button>
              </div>
            </div>
            <div>
              <span>₹{item.price * item.qty}</span>
              <button
                className="btn btn-danger"
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } })}
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))
      )}
      <h3>Total: ₹{total}</h3>
    </section>
  );
}

function CheckoutPage() {
  const total = useSelector(state => state.total);
  return (
    <section className="app">
      <h2>Checkout</h2>
      <p>Payable Amount: <strong>₹{total}</strong></p>
      <button className="btn btn-primary">Proceed to Payment</button>
    </section>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <ProductList />
      <CartPage />
      <CheckoutPage />
    </Provider>
  );
}

export default App;
