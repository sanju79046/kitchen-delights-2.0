import { Link } from "react-router-dom";
import trashCan from "../../assets/trash-bin.png";
import classes from "../DishesElement.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
const MyDishElement = ({ item, removeItem }) => {
  return (
    <Card className={classes.container}>
      <div className={classes.description}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
      <div className={classes["image-container"]}>
        <img alt={item.name} src={item.image} />
        <Link to="/edit-dish" state={item}>
          <Button className={classes["edit-button"]}>Edit</Button>
        </Link>
      </div>
      <img
        src={trashCan}
        alt="Remove-item"
        className={classes["delete-button"]}
        onClick={removeItem.bind(null, item._id)}
      />
    </Card>
  );
};

export default MyDishElement;
