const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrders,
  orderStatusUpdate,
} = require("../controller/ordersController");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.route("/").post(placeOrder).patch(orderStatusUpdate);
router.route("/:id").get(getOrders);

module.exports = router;
