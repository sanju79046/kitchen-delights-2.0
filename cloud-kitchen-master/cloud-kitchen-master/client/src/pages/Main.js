import { useState } from "react";
import KitchenList from "../components/KitchenList";
import Header from "../components/Layouts/Header";
import SearchElement from "../components/SearchElement";
import { getToken, getTokenDuration } from "../util/sessionHandler";
import classes from "./Main.module.css";

const Main = () => {
  document.title = "Cloud Kitchen";

  const [location, setLocation] = useState("none");

  return (
    <>
    
      <div className={classes["background-container"]}>
        <Header className={classes.header} />
        <SearchElement location={location} setLocation={setLocation} />
      </div>
      <main className={classes.main}>
        <KitchenList location={location} />
      </main>
    </>
  );
};

export default Main;

export const loader = async () => {
  const tokenData = getToken();
  const time = getTokenDuration();
  const token = tokenData && time > 0 ? "Bearer " + tokenData : null;
  const response = await fetch("http://localhost:5050/kitchens", {
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  });
  if (!response.ok) {
    throw response;
  }
  const kitchensData = await response.json();


//   const kitchensData=[
//     {
//     "name": "Kovai Virunthu",
//     "image": "https://www.architectureartdesigns.com/wp-content/uploads/2020/05/20-Mind-blowing-Mid-Century-Modern-Kitchen-Designs-You-Will-Obsess-Over-17.jpg",
//     "cuisineType": "Indian",
//     "location": "Gandhipuram",
//     "menuItems": [
//       {
//         "name": "Biriyani",
//         "mealType": "Breakfast",
//         "image": "https://th.bing.com/th/id/OIP.pA3QV9le3tWkxzb9gqli0gHaFj?rs=1&pid=ImgDetMain",
//         "description": "special ",
//         "price": 200,
//         "_id": {
//           "$oid": "66a118acfd2399a2161fd24d"
//         }
//       }
//     ]
//   },
//   {
//     "name": "Home kitchen",
//     "image": "https://www.architectureartdesigns.com/wp-content/uploads/2020/05/20-Mind-blowing-Mid-Century-Modern-Kitchen-Designs-You-Will-Obsess-Over-17.jpg",
//     "cuisineType": "italian",
//     "location": "chinniyampalayam",
//     "menuItems": [
//       {
//         "name": "Biriyani",
//         "mealType": "Breakfast",
//         "image": "https://th.bing.com/th/id/OIP.pA3QV9le3tWkxzb9gqli0gHaFj?rs=1&pid=ImgDetMain",
//         "description": "special ",
//         "price": 300,
//         "_id": {
//           "$oid": "66a118acfd2399a2161fd24d"
//         }
//       }
//     ]
//   }
// ]
  return kitchensData;
};