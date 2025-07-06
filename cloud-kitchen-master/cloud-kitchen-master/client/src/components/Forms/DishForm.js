import { useRef } from "react";
import { Form, useLocation, useSubmit } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./KitchenForm.module.css";

const DishForm = ({ item = {}, method }) => {
  const isEditForm = useLocation().pathname === "/edit-dish";

  const nameRef = useRef();
  const mealTypeRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const submit = useSubmit();

  const editHandler = (event) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current.value,
      mealType: mealTypeRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
    };
    const data = {};
    for (const attr in formData) {
      if (formData[attr] !== item[attr]) {
        data[attr] = formData[attr];
      }
    }
    submit({ ...data, id: item._id }, { method: "PATCH" });
  };

  return (
    <Form
      method={method}
      onSubmit={isEditForm && editHandler}
      className={classes.form}
    >
      <Input
        ref={nameRef}
        label="Dish Name"
        attr={{
          name: "name",
          defaultValue: item.name,
          id: "name",
          required: true,
        }}
      />
      <label htmlFor="mealType">
        <b>Meal Type</b>
      </label>

      <select
        id="mealType"
        name="mealType"
        ref={mealTypeRef}
        defaultValue={item.mealType}
        className={classes.selection}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Snacks">Snacks</option>
        <option value="Dinner">Dinner</option>
      </select>
      <Input
        label="Description"
        ref={descriptionRef}
        attr={{
          name: "description",
          required: true,
          defaultValue: item.description,
          id: "description",
        }}
      />
      <Input
        ref={priceRef}
        label="Price"
        attr={{
          name: "price",
          required: true,
          defaultValue: item.price,
          title: "Price in digits",
          id: "price",
          pattern: "^[0-9]*$",
        }}
      />
      <Input
        ref={imageRef}
        label="Dish Image URL"
        attr={{
          type: "url",
          name: "image",
          defaultValue: item.image,
          required: true,
          id: "image",
        }}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default DishForm;
