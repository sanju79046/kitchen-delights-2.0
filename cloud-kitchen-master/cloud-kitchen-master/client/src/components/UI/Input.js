import { forwardRef } from "react";
import "./Input.css";
const Input = forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.attr.id}>
        <b>{props.label}</b>
      </label>
      <input
        ref={ref}
        {...props.attr}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event.target.value);
        }}
      />
    </>
  );
});

export default Input;
