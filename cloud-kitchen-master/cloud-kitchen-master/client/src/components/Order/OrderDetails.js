import OrderItemsList from "./OrderItemsList";
import Card from "../UI/Card";
import classes from "./OrderDetails.module.css";
import Button from "../UI/Button";

const OrderDetatils = ({ order, completeHandler }) => {
  return (
    <Card key={order._id} className={classes["order-container"]}>
      <p>
        <b>User Name: </b>
        {order.userName}
      </p>
      <p>
        <b>User Id: </b>
        {order.userId}
      </p>
      <p>
        <b>Order date: </b>
        {new Date(order.date).toDateString()}
      </p>
      <p>
        <b>Delivery Slot: </b>
        {order.slot}
      </p>
      <p>
        <b>Delivery Address: </b>
        {order.address}
      </p>
      <p>
        <b>Number: </b>
        {order.number}
      </p>
      <p>
        <b>Special Instructions: </b>
        {order.instructions || "None"}
      </p>
      <OrderItemsList items={order.items} />
      <p>
        <b>Total Amount: ₹ </b>
        {order.totalAmount}
      </p>
      <p>
        <b>Status: </b>
        {order.status}
        {order.status === "pending" && (
          <Button onClick={completeHandler.bind(null, order._id)}>
            Mark Completed
          </Button>
        )}
      </p>
    </Card>
  );
};

export default OrderDetatils;
