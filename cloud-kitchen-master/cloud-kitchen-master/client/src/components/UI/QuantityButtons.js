import Button from "./Button";
import classes from "./QuantityButtons.module.css";

const QuantityButtons = (props) => {
  return (
    <div className={`${classes["button-container"]} ${props.className}`}>
      <Button
        onClick={props.onMinusClick}
        className={classes["quantity-button"]}
      >
        -
      </Button>
      <input value={props.val} readOnly />
      <Button
        onClick={props.onPlusClick}
        className={classes["quantity-button"]}
      >
        +
      </Button>
    </div>
  );
};

export default QuantityButtons;
