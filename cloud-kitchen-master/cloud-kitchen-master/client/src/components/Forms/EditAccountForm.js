import { useRef, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getToken, setToken, tokenPayload } from "../../util/sessionHandler";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./EditAccountForm.module.css";

const EditAccountForm = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const payload = tokenPayload();
  const isUser = payload && payload.privilege === "user";
  const isOwner = payload && payload.privilege === "owner";

  const nameRef = useRef();
  const numberRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState(null);

  const submit = useSubmit();

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      confirmPasswordRef.current &&
      confirmPasswordRef.current.value !== passwordRef.current.value
    ) {
      return setErrors(
        "entered passwords doesn't match please re-enter passwords."
      );
    }
    const data = {};
    if (nameRef.current.value !== payload.name) {
      data.name = nameRef.current.value;
    }
    if (+numberRef.current.value !== payload.number) {
      data.number = numberRef.current.value;
    }
    if (
      oldPasswordRef.current &&
      oldPasswordRef.current.value !== payload.oldPassword
    ) {
      data.oldPassword = oldPasswordRef.current.value;
      data.password = passwordRef.current.value;
    }
    submit(data, { method: "PATCH" });
  };

  const navigate = useNavigate();

  const removeHandler = async () => {
    const confirm = window.confirm(
      "Removing kitchen can't be undone.\nAre you sure?"
    );
    if (confirm) {
      try {
        const token = "Bearer " + getToken();
        const response = await fetch(
          "http://localhost:5050/kitchens/remove-kitchen",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        );
        if (!response.ok) {
          console.log(response);
          throw response;
        }
        const newToken = await response.json();
        setToken(newToken);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [editPassword, setEditPassword] = useState(false);
  return (
    <Card>
      <Form method="post" onSubmit={submitHandler}>
        <div className={classes["input-container"]}>
          <h2 className={classes.h2}>Edit Your Account</h2>
          <Input
            label="Full Name"
            ref={nameRef}
            attr={{
              name: "name",
              id: "name",
              defaultValue: payload.name,
              required: true,
            }}
          />
          <Input
            label="Phone Number"
            ref={numberRef}
            attr={{
              name: "number",
              defaultValue: payload.number,
              type: "tel",
              pattern: "[0-9]{10}",
              title: "10 digit valid mobile number",
              id: "number",
              required: true,
            }}
          />
          <Button
            type="button"
            className={classes.button}
            onClick={() => setEditPassword((prev) => !prev)}
          >
            {editPassword && "Cancel "}Change Password
          </Button>
          {editPassword && (
            <>
              <Input
                ref={oldPasswordRef}
                label="Current Password"
                attr={{
                  name: "password",
                  minLength: 5,
                  type: "password",
                  id: "password",
                  required: true,
                }}
              />
              <Input
                ref={passwordRef}
                label="New Password"
                attr={{
                  name: "new-password",
                  minLength: 5,
                  type: "password",
                  id: "new-password",
                  required: true,
                }}
              />
              <Input
                ref={confirmPasswordRef}
                label="Confirm Password"
                attr={{
                  name: "confirm-password",
                  minLength: 5,
                  type: "password",
                  id: "confirm-password",
                  required: true,
                }}
              />
            </>
          )}
          {isUser && (
            <Button type="button" className={classes.button}>
              <Link to="/add-kitchen">Add Kitchen</Link>
            </Button>
          )}

          {errors && <p className={classes.error}>{errors}</p>}
          {actionData && <p className={classes.error}>{actionData.message}</p>}
        </div>

        <div className={classes["button-container"]}>
          {isOwner && (
            <Button
              type="button"
              onClick={removeHandler}
              className={classes.danger}
            >
              Remove Kitchen
            </Button>
          )}
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditAccountForm;

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const token = "Bearer " + getToken();
  const response = await fetch("http://localhost:5050/auth/edit-user", {
    method: "PATCH",
    headers: { "content-type": "application/json", authorization: token },
    body: JSON.stringify(data),
  });

  if (response.status === 422) {
    console.log(response);
  }

  if (!response.ok) {
    throw response;
  }
  const newToken = await response.json();
  setToken(newToken);
  return redirect("/");
};
