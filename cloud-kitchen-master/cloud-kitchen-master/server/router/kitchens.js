const express = require("express");
const router = express.Router();
const {
  getKitchens,
  getMyKitchen,
  addKitchen,
  editKitchen,
  getKitchenDetails,
  addDish,
  editDish,
  removeDish,
  removeKitchen,
} = require("../controller/kitchensController");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(getKitchens).post(addKitchen);

router.route("/my-kitchen").get(verifyToken, getMyKitchen);

router.route("/:id").get(getKitchenDetails);

router.route("/add-kitchen").post(verifyToken, addKitchen);

router.route("/edit-kitchen").patch(verifyToken, editKitchen);

router.route("/add-dish").post(verifyToken, addDish);

router.route("/edit-dish").patch(verifyToken, editDish);

router.route("/remove-dish/:id").delete(verifyToken, removeDish);

router.route("/remove-kitchen").delete(verifyToken, removeKitchen);

module.exports = router;
