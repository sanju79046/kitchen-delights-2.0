import { useLoaderData } from "react-router-dom";
import KitchenElement from "./KitchenElement";

const KitchenList = ({ location }) => {
  const loaderData = useLoaderData();

  const kitchensData =
    location !== "none"
      ? loaderData.filter((kitchen) => kitchen.location === location)
      : loaderData;
  return (
    <>
      {kitchensData.length === 0 ? (
        <h4 style={{ textAlign: "center", width: "90vw" }}>
          Currently no kitchens available at this location.
        </h4>
      ) : (
        Object.values(kitchensData).map((item) => (
          <KitchenElement key={item.id} item={item} />
        ))
      )}
    </>
  );
};

export default KitchenList;
