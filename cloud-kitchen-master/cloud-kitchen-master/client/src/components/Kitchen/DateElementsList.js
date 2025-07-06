import { useContext } from "react";
import DateElement from "./DateElement";
import classes from "./DateElementsList.module.css";
import CartContext from "../../store/cart-context";

const dates = [];
let today = new Date(new Date().setHours(0, 0, 0, 0));
let oneDay = 1000 * 60 * 60 * 24;
dates.push(today);
for (let index = 0; index < 10; index++) {
  dates.push(new Date(dates[dates.length - 1].getTime() + oneDay));
}

const DateElementsList = () => {
  const ctx = useContext(CartContext);
  return (
    <>
      <p style={{ textAlign: "center" }}>~~PRE-ORDER~~</p>
      <div className={classes.dates}>
        {dates.map((date) => {
          return (
            <DateElement
              key={date.toString()}
              className={
                JSON.stringify(ctx.date) === JSON.stringify(date)
                  ? classes.active
                  : ""
              }
              date={date}
              onDateClickHandler={ctx.changeDate}
            />
          );
        })}
      </div>
    </>
  );
};
export default DateElementsList;
