import DateElementsList from "../components/Kitchen/DateElementsList";
import MenuItemsList from "../components/Kitchen/MenuItemsList";
import MealTypeList from "../components/Kitchen/MealTypeList";
import DetailsDescription from "../components/Kitchen/DetailsDescription";
import { json, useLoaderData } from "react-router-dom";

const KitchenDetails = () => {
  const loaderData = useLoaderData();

  return (
    <>
      <DetailsDescription loaderData={loaderData} />
      <DateElementsList />
      <MealTypeList />
      <MenuItemsList loaderData={loaderData} />
    </>
  );
};

export default KitchenDetails;

export const loader = async ({ params }) => {
  const response = await fetch("http://localhost:5050/kitchens/" + params.id);
  if (!response.ok) {
    throw json({ message: "Cannot retreive kitchen deatails." });
  }
  const data = await response.json();
  return data;
};
