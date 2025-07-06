import { useContext } from "react";
import classes from "./MenuItemsList.module.css";
import CartContext from "../../store/cart-context";
import MyDishElement from "./MyDishElement";
import { getToken } from "../../util/sessionHandler";
import { useNavigate } from "react-router-dom";

const MyDishesList = ({ loaderData }) => {
  const ctx = useContext(CartContext);
  document.title=loaderData.name;
  const dishes = loaderData.menuItems.filter(
    (item) => item.mealType === ctx.mealType
  );
  const navigate = useNavigate();

  const removeItem = async (id) => {
    const confirm = window.confirm(
      "Are you sure?\nClick OK to delete the dish permanently."
    );
    if (confirm) {
        const token = "Bearer " + getToken();
        const response = await fetch(
          "http://localhost:5050/kitchens/remove-dish/" + id,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          alert("Dish deletion failed!");
          return;
        }
        navigate("/my-kitchen");
    }
  };

  const data = dishes.map((item) => (
    <MyDishElement key={item._id} item={item} removeItem={removeItem} />
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

export default MyDishesList;
