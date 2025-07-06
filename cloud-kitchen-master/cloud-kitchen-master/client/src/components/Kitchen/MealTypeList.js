import { useContext } from "react";
import classes from "./MealTypeList.module.css";
import cartContext from "../../store/cart-context";

const MealTypeList = () => {
  const ctx = useContext(cartContext);

  return (
    <ul className={classes["list-container"]}>
      <li
        onClick={ctx.changeMealType}
        className={ctx.mealType === "Breakfast" ? classes.active : ""}
      >
        Breakfast
      </li>
      <li
        onClick={ctx.changeMealType}
        className={ctx.mealType === "Lunch" ? classes.active : ""}
      >
        Lunch
      </li>
      <li
        onClick={ctx.changeMealType}
        className={ctx.mealType === "Snacks" ? classes.active : ""}
      >
        Snacks
      </li>
      <li
        onClick={ctx.changeMealType}
        className={ctx.mealType === "Dinner" ? classes.active : ""}
      >
        Dinner
      </li>
    </ul>
  );
};

export default MealTypeList;
