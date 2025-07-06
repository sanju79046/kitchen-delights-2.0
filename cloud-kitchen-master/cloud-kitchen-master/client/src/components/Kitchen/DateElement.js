import Card from "../UI/Card";
import classes from "./DateElement.module.css";

const DateElement = (props) => {
  return (
    <Card
      className={`${classes["date-item"]} ${props.className}`}
      onClick={props.onDateClickHandler.bind(null, props.date)}
    >
      <div>{props.date.toDateString().split(" ")[0]}</div>
      <div>{props.date.getDate()}</div>
    </Card>
  );
};

export default DateElement;
