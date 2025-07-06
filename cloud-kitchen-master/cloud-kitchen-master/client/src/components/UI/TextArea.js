import classes from "./TextArea.module.css";

const TextArea = (props) => {
  const growArea = (event) => {
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <>
      <label className={classes.label} htmlFor={props.label}>
        <b>{props.label}</b>
      </label>
      <textarea
        onInput={growArea}
        defaultValue={props.defaultValue}
        className={`${classes["text-area"]} ${
          props.className ? props.className : ""
        }`}
        onBlur={(event) => {
          props.onBlur(event.target.value);
        }}
        id={props.label}
        name={props.name}
        required
      ></textarea>
    </>
  );
};

export default TextArea;
