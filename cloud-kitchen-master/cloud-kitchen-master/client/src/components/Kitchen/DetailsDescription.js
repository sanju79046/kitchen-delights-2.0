import { Link, useLocation } from "react-router-dom";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./DetailsDescription.module.css";

const DetailsDescription = ({ loaderData }) => {
  const isMyKitchen = useLocation().pathname === "/my-kitchen";
  const backgroundErrorHandler = (event) => {
    event.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDQ22xgk2PYGS_Y1OvfRUabKICuRBTP5HzgegXADIaf2qU_RIiOpTi5iwMge1-hAhOw4&usqp=CAU";
  };
  return (
    <>
      <div className={classes["about-container"]} style={{backgroundColor:"#F8EDE3"}}>
        {!isMyKitchen && <BackButton />}
        <img
          alt="backgroud"
          className={classes["background-image"]}
          src={loaderData.image}
          onError={backgroundErrorHandler}
          style={{borderRadius:"25px"}}
        />
        <Card className={classes.about} >
          <h3>{loaderData.name}</h3>
          <h4> &emsp; &emsp;{loaderData.location}</h4>
          <h4> &emsp; &emsp;{loaderData.cuisineType}</h4>
          {isMyKitchen && (
            < >
              <Link to="/edit-kitchen" state={loaderData}>
                <Button className={classes.edit}>Edit</Button>
              </Link>
              <div className={classes["button-container"]}>
                <Link to="/add-dish">
                  <Button >+Add New Dish</Button>
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default DetailsDescription;
