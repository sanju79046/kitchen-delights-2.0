import Card from "../UI/Card";
import classes from "./Slots.module.css";

const slots = {
  breakfast: [
    "7.30",
    "8.00",
    "8.30",
    "9.00",
    "9.30",
    "10.00",
    "10.30",
    "11.00",
  ],
  lunch: [
    "12.30",
    "1.00",
    "1.30",
    "2.00",
    "2.30",
    "3.00",
    "3.30",
    "4.00",
    "4.30",
  ],
  snacks: ["4.00", "4.30", "5.00", "5.30", "6.00", "6.30", "7.00"],
  dinner: ["7.30", "8.00", "8.30", "9.00", "9.30", "10.00", "10.30"],
};

const Slots = (props) => {
  let data;
  switch (props.slot) {
    case "Breakfast":
      data = slots.breakfast;
      break;
    case "Lunch":
      data = slots.lunch;
      break;
    case "Snacks":
      data = slots.snacks;
      break;
    case "Dinner":
      data = slots.dinner;
      break;
    default:
      data = ["Wrong Meal-Type"];
      break;
  }
  const isActive = props.currentSlot;
  return (
    <Card className={classes.container}>
      <p>
        <span>
          <b>Delivery Timeslot</b> (
          {props.date.toDateString().replaceAll(" ", "-")})
        </span>
        <span>{props.slot}</span>
      </p>
      <div className={classes["slots-container"]}>
        {data.map((time) => (
          <div
            key={time}
            className={`${classes.slots} ${
              isActive === time ? classes.active : ""
            }`}
            onClick={props.setSlot.bind(null, time)}
          >
            {time}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Slots;
