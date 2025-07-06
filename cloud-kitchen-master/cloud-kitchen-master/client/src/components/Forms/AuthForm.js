import { useRef, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { setToken } from "../../util/sessionHandler";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  isLogin ? (document.title = "Log in") : (document.title = "Sign in");
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState(null);

  const submitHandler = (event) => {
    if (
      confirmPasswordRef.current &&
      confirmPasswordRef.current.value !== passwordRef.current.value
    ) {
      event.preventDefault();
      setErrors("entered passwords doesn't match please re-enter passwords.");
    }
  };

  return (
    <Card>
      <Form method="post" onSubmit={submitHandler}>
        <div className={classes["input-container"]}>
          <h2 className={classes.h2}>
            {isLogin ? "Login" : "Create New Account"}
          </h2>
          {!isLogin && (
            <Input
              label="Full Name"
              attr={{ name: "name", id: "name", required: true }}
            />
          )}
          <Input
            label="Phone Number"
            attr={{
              name: "number",
              type: "tel",
              pattern: "[0-9]{10}",
              title: "10 digit valid mobile number",
              id: "number",
              required: true,
            }}
          />
          <Input
            ref={passwordRef}
            label="Password"
            attr={{
              name: "password",
              minLength: 5,
              type: "password",
              id: "password",
              required: true,
            }}
          />
          {!isLogin && (
            <>
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
              {errors && <p className={classes.error}>{errors}</p>}
            </>
          )}
          {actionData && <p className={classes.error}>{actionData.message}</p>}
        </div>

        <div className={classes["button-container"]}>
          <Link
            className={classes.link}
            to={`?mode=${isLogin ? "signin" : "login"}`}
          >
            {isLogin ? "Singin" : "Login"}
          </Link>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AuthForm;

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const searchParams = new URL(request.url).searchParams;
  const response = await fetch(
    "http://localhost:5050/auth/" + searchParams.get("mode"),
    {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw response;
  }
  const token = await response.json();
  if (token) {
    setToken(token);
  }
  const privilege = JSON.parse(atob(token.split(".")[1])).privilege;
  if (privilege === "user") {
    return redirect("/");
  } else {
    return redirect("/my-kitchen");
  }
};
