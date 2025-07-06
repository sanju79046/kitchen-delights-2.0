import { redirect, useLocation } from "react-router-dom";
import { getToken, setToken } from "../../util/sessionHandler";
import KitchenForm from "../Forms/KitchenForm";
import Card from "../UI/Card";

const ModifyKitchen = () => {
  const url = useLocation();
  const path = url.pathname;
  const state = url.state;
  return (
    <Card>
      {path === "/add-kitchen" && <KitchenForm />}
      {path === "/edit-kitchen" && <KitchenForm data={state} />}
    </Card>
  );
};

export default ModifyKitchen;

export const action = async ({ request }) => {
  const path = new URL(request.url).pathname;
  const data = Object.fromEntries(await request.formData());
  const response = await fetch("http://localhost:5050/kitchens/" + path, {
    method: request.method,
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw response;
  }
  if (path === "/add-kitchen") {
    const token = await response.json();
    setToken(token);
  }
  return redirect("/my-kitchen");
};
