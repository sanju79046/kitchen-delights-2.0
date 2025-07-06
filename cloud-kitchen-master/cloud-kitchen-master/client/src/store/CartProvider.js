import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultData = {
  mealType: "Breakfast",
  kitchen: "",
  kitchenId: "",
  totalAmount: 0,
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  changeDate: (date) => {},
  slot: "",
  items: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  setSlot: (slot) => {},
  clearCart: () => {},
  instructions: "",
  setInstructions: () => {},
  number: "",
  setNumber: () => {},
  address: "",
  setAddress: () => {},
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MEAL_TYPE": {
      const updated = { ...state, mealType: action.data };
      return updated;
    }

    case "SET_DATE": {
      const updated = { ...state, date: action.data };
      return updated;
    }

    case "ADD_ITEM": {
      //handling adding new dish of different mealtype
      if (
        state.items.length &&
        state.items[0].mealType !== action.item.mealType
      ) {
        const confirm = window.confirm(
          `Already have ${state.items[0].mealType} dishes replace it with ${action.item.mealType}?`
        );
        if (confirm) {
          return {
            ...state,
            totalAmount: action.item.price,
            items: [{ ...action.item, quantity: 1 }],
          };
        } else {
          return state;
        }
      }
      //handling adding dish from different kitchen
      else if (
        state.kitchenId &&
        action.kitchen.kitchenId &&
        state.kitchenId !== action.kitchen.kitchenId
      ) {
        const confirm = window.confirm(
          `Already have dishes from ${state.kitchen} replace it with ${action.kitchen.kitchen}?`
        );
        if (confirm) {
          const updated = {
            ...state,
            items: [{ ...action.item, quantity: 1 }],
            kitchen: action.kitchen.kitchen,
            kitchenId: action.kitchen.kitchenId,
            totalAmount: action.item.price,
          };
          return updated;
        } else {
          return state;
        }
      }
      //adding new dish
      else {
        const updatedTotalAmount = +state.totalAmount + +action.item.price;
        const existingItemIndex = state.items.findIndex(
          (item) => item._id === action.item._id
        );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            quantity: +existingItem.quantity + 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          const updatedItem = { ...action.item, quantity: 1 };
          updatedItems = state.items.concat(updatedItem);
        }
        const val = {
          ...state,
          totalAmount: updatedTotalAmount,
          items: updatedItems,
          kitchen: action.kitchen.kitchen,
          kitchenId: action.kitchen.kitchenId,
        };
        return val;
      }
    }

    case "REMOVE_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem._id === action.id
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      let updatedTotalAmount = state.totalAmount;
      if (existingItem && existingItem.quantity > 1) {
        updatedTotalAmount = +state.totalAmount - +existingItem.price;
        const updatedItem = {
          ...existingItem,
          quantity: +existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.filter((item) => item._id !== action.id);
        updatedTotalAmount = state.totalAmount - +existingItem.price;
      }
      const val = {
        ...state,
        totalAmount: updatedTotalAmount,
        items: updatedItems,
      };
      return val;
    }

    case "SET_SLOT": {
      return { ...state, slot: action.slot };
    }

    case "CLEAR_CART": {
      return defaultData;
    }

    case "SET_ADDRESS": {
      return { ...state, address: action.data };
    }

    case "SET_INSTRUCTIONS": {
      return { ...state, instructions: action.data };
    }

    case "SET_Number": {
      return { ...state, number: action.data };
    }

    case "LOGOUT": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    case "LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    default:
      return defaultData;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(reducer, defaultData);

  const addItemToCart = (item, kitchen) => {
    dispatchCartActions({ type: "ADD_ITEM", item: item, kitchen: kitchen });
  };

  const removeItemFromCart = (id) => {
    dispatchCartActions({ type: "REMOVE_ITEM", id: id });
  };

  const changeMealType = (event) => {
    dispatchCartActions({ type: "MEAL_TYPE", data: event.target.innerHTML });
  };

  const changeDate = (date) => {
    dispatchCartActions({ type: "SET_DATE", data: date });
  };

  const setSlot = (slot) => {
    dispatchCartActions({ type: "SET_SLOT", slot: slot });
  };

  const clearCart = () => {
    dispatchCartActions({ type: "CLEAR_CART" });
  };

  const setAddress = (data) => {
    dispatchCartActions({ type: "SET_ADDRESS", data: data });
  };

  const setNumber = (data) => {
    dispatchCartActions({ type: "SET_Number", data: data });
  };

  const setInstructions = (data) => {
    dispatchCartActions({ type: "SET_INSTRUCTIONS", data: data });
  };

  const logout = () => {
    dispatchCartActions({ type: "LOGOUT" });
  };

  const login = () => {
    dispatchCartActions({ type: "LOGIN" });
  };

  const cartContext = {
    changeMealType: changeMealType,
    mealType: cartState.mealType,
    kitchenId: cartState.kitchenId,
    kitchen: cartState.kitchen,
    totalAmount: cartState.totalAmount,
    date: cartState.date,
    changeDate: changeDate,
    slot: cartState.slot,
    setSlot: setSlot,
    items: cartState.items,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    clearCart: clearCart,
    instructions: cartState.instructions,
    setInstructions: setInstructions,
    number: cartState.number,
    setNumber: setNumber,
    address: cartState.address,
    setAddress: setAddress,
    isLoggedIn: cartState.isLoggedIn,
    logout: logout,
    login: login,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
