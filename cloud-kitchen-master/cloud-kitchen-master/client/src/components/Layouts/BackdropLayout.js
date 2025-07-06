import { Outlet } from "react-router-dom";
import ReactDOM from "react-dom";
import classes from "./BackdropLayout.module.css";
import BackButton from "../UI/BackButton";
const BackdropLayout = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackdropLayoutElemet />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

const BackdropLayoutElemet = () => {
  return (
    <div className={classes.backdrop}>
      <BackButton />
      <div className={classes.overlay}>
        <Outlet />
      </div>
    </div>
  );
};

export default BackdropLayout;
