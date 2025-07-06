import Card from "../UI/Card";
import classes from "./PaymentDetails.module.css";

const PaymentDetails = (props) => {
  return (
    <Card className={classes.container}>
      <h3 className={classes.bold}>Receipt</h3>
      <p>
        Total Price<span>₹ {props.totalAmount}</span>
      </p>
      <p style={{ color: "green" }}>
        Packing Charges<span>FREE</span>
      </p>
      <p>
        Delivery Charges<span>₹ 30</span>
      </p>
      <h4 className={classes.bold}>
        Grand Total
        <span>₹ {props.totalAmount !== 0 ? props.totalAmount + 30 : 0}</span>
      </h4>
    </Card>
  );
};

export default PaymentDetails;
