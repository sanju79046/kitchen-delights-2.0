import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../store/cart-context";
import DishesElement from "../DishesElement";
import Button from "../UI/Button";
import classes from "./CartItemsList.module.css";

const CartItemsList = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(CartContext);
  return (
    <>
      <p>
        <b>Items</b>
      </p>
      <div className={classes["items-list"]}>
        {props.items.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Items in cart to display</p>
        ) : (
          props.items.map((item) => (
            <DishesElement
              kitchen={{ kitchen: ctx.kitchen, kitchenId: ctx.kitchenId }}
              key={item._id}
              item={item}
            />
          ))
        )}
      </div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        + Add more Items
      </Button>
    </>
  );
};

export default CartItemsList;
