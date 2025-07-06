import Card from "../UI/Card";
import classes from "./OrderElement.module.css";

const OrderElement = ({ item }) => {
  return (
    <Card className={classes.container}>
      <div className={classes.description}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
      <div className={classes["image-container"]}>
        <img alt={item.name} src={item.image} />
        <div className={classes.quantity}>x{item.quantity}</div>
      </div>
    </Card>
  );
};

export default OrderElement;
