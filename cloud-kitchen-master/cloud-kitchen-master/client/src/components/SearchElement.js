import HomeBack from "../assets/HomeBack.mp4"; // Correctly import the video file
import locations from "../assets/locations";
import classes from "./SearchElement.module.css";

const SearchElement = ({ location, setLocation }) => {
  return (
    <>
    
      {/* <img src="https://www.expatchoice.asia/sites/default/files/u503/Awadh%20GIF%20%282%29.gif" alt="background" className={classes.background} /> */}

      <video
        className={classes.background}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={HomeBack} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={classes.location}>

        <label htmlFor="location">
          <b>Location</b>
        </label>
        <select
          onChange={(event) => setLocation(event.target.value)}
          defaultValue={location}
          className={classes.selection}
          id="location"
          name="location"
        >
          
          <option value="none">--Select--</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
};

export default SearchElement;
