import { useNavigate } from "react-router-dom";
import classes from "./KitchenElement.module.css";
import Card from "./UI/Card";

const KitchenElement = ({ item }) => {
  const navigate = useNavigate();
  const onItemClickHandler = () => {
    return navigate("/kitchens/" + item.id);
  };

  return (
    <Card className={classes.item} onClick={onItemClickHandler}>
      <div className={classes.image}>
        <img alt={item.name} src={item.image} style={{height:'300px',width:'300px'}} />
      </div>
      <div className={classes["item-description"]}>
        <h3>{item.name}</h3>
        <p>{item.location}</p>
        <p>{item.cuisineType}</p>
      </div>
    </Card>
  );
};

export default KitchenElement;
