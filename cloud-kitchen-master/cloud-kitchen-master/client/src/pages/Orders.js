import Header from "../components/Layouts/Header";
import { getToken } from "../util/sessionHandler";
import { useParams } from "react-router-dom";
import classes from "./Orders.module.css";
import Button from "../components/UI/Button";
import { useEffect, useState } from "react";
import OrderDetatils from "../components/Order/OrderDetails";

const Orders = () => {
  const kitchenId = useParams().id;

  const [oldOrders, setOldOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loader(kitchenId)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, [kitchenId]);

  const completeHandler = async (id) => {
    const token = "Bearer " + getToken();
    const response = await fetch("http://localhost:5050/orders", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: token },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw response;
    }
    loader(kitchenId)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  };

  const toggleOrderHistory = () => {
    setOldOrders((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Button onClick={toggleOrderHistory}>
        {oldOrders ? "Hide Order History" : "View Order History"}
      </Button>
      <div className={classes.container}>
        {oldOrders &&
          orders
            .filter((order) => order.status === "completed")
            .map((oldOrders) => (
              <OrderDetatils key={oldOrders._id} order={oldOrders} />
            ))}
      </div>
      <h1 style={{ textAlign: "center" }}>~~Pending Orders~~</h1>
      <div className={classes.container}>
        {orders
          .filter((order) => order.status === "pending")
          .map((order) => (
            <OrderDetatils
              key={order._id}
              completeHandler={completeHandler}
              order={order}
            />
          ))}
      </div>
    </>
  );
};

export default Orders;

const loader = async (id) => {
  const response = await fetch("http://localhost:5050/orders/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getToken(),
    },
  });
  if (!response.ok) {
    throw response;
  }
  const data = await response.json();
  return data;
};
