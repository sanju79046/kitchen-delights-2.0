import { createContext } from "react";

const defaultData = {
  totalAmount: 0,
  mealType: "Breakfast",
  changeMealType: () => {},
  kitchen: "",
  kitchenId: "",
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  changeDate: (date) => {},
  slot: "",
  items: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  setSlot: (slot) => {},
  clearCart: () => {},
  instructions: "",
  setInstructions: (data) => {},
  number: "",
  setNumber: (data) => {},
  address: "",
  setAddress: (data) => {},
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
};

const CartContext = createContext(defaultData);

export default CartContext;
