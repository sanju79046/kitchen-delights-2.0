import { redirect, useLocation } from "react-router-dom";
import { getToken } from "../../util/sessionHandler";
import DishForm from "../Forms/DishForm";
import Card from "../UI/Card";

const ModifyDish = () => {
  const url = useLocation();
  const path = url.pathname;
  const item = url.state;
  return (
    <Card>
      {path === "/add-dish" && <DishForm method="post" />}
      {path === "/edit-dish" && <DishForm method="patch" item={item} />}
    </Card>
  );
};

export default ModifyDish;

export const action = async ({ request }) => {
  const path = new URL(request.url).pathname;
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch("http://localhost:5050/kitchens" + path, {
    method: request.method,
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw response;
  }
  return redirect("/my-kitchen");
};
 