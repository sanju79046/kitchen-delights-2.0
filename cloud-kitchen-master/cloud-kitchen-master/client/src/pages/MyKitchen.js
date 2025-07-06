import MealTypeList from "../components/Kitchen/MealTypeList";
import DetailsDescription from "../components/Kitchen/DetailsDescription";
import { useLoaderData } from "react-router-dom";
import { getToken } from "../util/sessionHandler";
import MyDishesList from "../components/Kitchen/MyDishesList";
import Header from "../components/Layouts/Header";

const MyKitchen = () => {
  const data = useLoaderData();

  return (
    <>
      <Header />
      <DetailsDescription loaderData={data} />
      <MealTypeList />
      <MyDishesList loaderData={data} />
    </>
  );
};

export default MyKitchen;

export const loader = async () => {
  const response = await fetch("http://localhost:5050/kitchens/my-kitchen", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getToken(),
    },
  });
  if (!response.ok) {
    throw response;
  }
  return response;
};
