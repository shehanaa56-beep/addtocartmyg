// src/cartReducer.js
const initialState = {
  cart: [],
  total: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existing = state.cart.find(p => p.id === item.id);

      let newCart;
      if (existing) {
        newCart = state.cart.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        newCart = [...state.cart, { ...item, qty: 1 }];
      }

      const newTotal = newCart.reduce((sum, p) => sum + p.price * p.qty, 0);
      return { cart: newCart, total: newTotal };
    }

    case "REMOVE_FROM_CART": {
      const newCart = state.cart.filter(p => p.id !== action.payload.id);
      const newTotal = newCart.reduce((sum, p) => sum + p.price * p.qty, 0);
      return { cart: newCart, total: newTotal };
    }

    case "UPDATE_QTY": {
      const newCart = state.cart.map(p =>
        p.id === action.payload.id ? { ...p, qty: action.payload.qty } : p
      );
      const newTotal = newCart.reduce((sum, p) => sum + p.price * p.qty, 0);
      return { cart: newCart, total: newTotal };
    }

    default:
      return state;
  }
};

export default cartReducer;
