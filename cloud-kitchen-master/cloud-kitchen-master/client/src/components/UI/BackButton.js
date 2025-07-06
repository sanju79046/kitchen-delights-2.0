import { useNavigate } from "react-router-dom";
import backButton from "../../assets/back-arrow.png";
import classes from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <img
      src={backButton}
      onClick={() => {
        navigate(-1);
      }}
      className={classes["back-button"]}
      alt="back-button"
    />
  );
};

export default BackButton;
