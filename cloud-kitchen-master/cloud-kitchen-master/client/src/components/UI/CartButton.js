import { Link } from "react-router-dom";
import basket from "../../assets/basket.png";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  return (
    <Link to="cart" className={classes.cart}>
      <img src={basket} className={classes["cart-img"]} alt="Cart" />
      <span className={classes.counter}>{props.counter}</span>
    </Link>
  );
};
export default CartButton;
