import { useContext } from "react";
import CartContext from "../../store/cart-context";
import DishesElement from "../DishesElement";
import classes from "./MenuItemsList.module.css";

const MenuItemsList = ({ loaderData }) => {
  document.title = loaderData.name;
  const ctx = useContext(CartContext);

  const dishes = loaderData.menuItems.filter(
    (item) => item.mealType === ctx.mealType
  );
  const kitchen = { kitchen: loaderData.name, kitchenId: loaderData._id };

  const data = dishes.map((item) => (
    <DishesElement key={item._id} kitchen={kitchen} item={item} />
  ));
  return (
    <div className={classes["menu-list"]}>
      {data.length > 0 ? (
        data
      ) : (
        <h4 style={{ textAlign: "center", width: "100vw" }}>
          Currently no dishes to display.
        </h4>
      )}
    </div>
  );
};

export default MenuItemsList;
