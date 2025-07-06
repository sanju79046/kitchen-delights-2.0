import OrderElement from "./OrderElemet";

const OrderItemsList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <OrderElement key={item._id} item={item} />
      ))}
    </>
  );
};

export default OrderItemsList;
