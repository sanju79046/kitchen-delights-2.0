const Kitchen = require("../model/kitchen");
const Order = require("../model/order");
const mongoose = require("mongoose");
const User = require("../model/user");
const { generateToken } = require("./authController");
const jwt = require("jsonwebtoken");

const getKitchens = async (req, res) => {
  let token = req.headers.authorization || req.headers.Authorization;
  token = token.split(" ")[1];
  let id = null;
  try {
    if (token) {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      id = user && user.userId;
    }
    const kitchenData = await Kitchen.find(
      { ownerId: { $ne: id } },
      {
        _id: 0,
        id: "$_id",
        name: 1,
        image: 1,
        cuisineType: 1,
        location: 1,
      }
    );
    res.status(200).json(kitchenData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMyKitchen = async (req, res) => {
  try {
    const userId = req.user.userId;
    const kitchen = await Kitchen.findOne({ ownerId: userId });
    if (!kitchen) {
      return res
        .status(401)
        .send({ message: "There is no existing kitchen for this account." });
    }
    res.status(200).send(kitchen);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getKitchenDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const kitchenDetails = await Kitchen.findOne({
      _id: id,
    });
    res.status(200).json(kitchenDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addKitchen = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const data = { ...req.body, ownerId: req.user.userId };
    session.startTransaction();
    const kitchen = await Kitchen.create(data);
    await User.updateOne(
      { _id: req.user.userId },
      { $set: { privilege: "owner" } }
    );
    const userData = await User.findOne({ _id: req.user.userId });
    const payload = {
      userId: userData._id,
      privilege: userData.privilege,
      name: userData.name,
      kitchenId: kitchen._id,
      number: userData.number,
    };
    const token = await generateToken(payload);
    res.status(201).json(token);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send(error);
  } finally {
    await session.endSession();
  }
};

const editKitchen = async (req, res) => {
  try {
    const modifiedData = req.body;
    const id = modifiedData.id;
    delete modifiedData.id;
    await Kitchen.updateOne({ _id: id }, { $set: modifiedData });
    res.status(200).json({ message: "Editted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeKitchen = async (req, res) => {
  try {
    const kitchenId = req.user.kitchenId;
    const userId = req.user.userId;
    await Kitchen.deleteOne({ _id: kitchenId });
    await User.updateOne({ _id: userId }, { $set: { privilege: "user" } });
    await Order.deleteMany({
      kitchenId: new mongoose.Types.ObjectId(kitchenId),
    });
    const updatedUser = await User.findOne({ _id: req.user.userId });
    const payload = {
      userId: updatedUser._id,
      name: updatedUser.name,
      privilege: updatedUser.privilege,
      number: updatedUser.number,
    };
    const token = await generateToken(payload);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addDish = async (req, res) => {
  try {
    const dish = req.body;
    await Kitchen.updateOne(
      { ownerId: req.user.userId },
      { $push: { menuItems: dish } }
    );
    res.status(200).json("added dish");
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeDish = async (req, res) => {
  try {
    const id = req.params.id;
    await Kitchen.updateOne(
      { ownerId: req.user.userId },
      { $pull: { menuItems: { _id: new mongoose.Types.ObjectId(id) } } }
    );
    res.status(200).json({ user: req.user, deleted: req.params.id });
  } catch (error) {
    res.status(401).json({ message: "Couldn't delete dish.", error });
  }
};

const editDish = async (req, res) => {
  try {
    const data = req.body;
    const updateData = {};
    for (const attr in data) {
      if (attr === "id") {
        continue;
      }
      updateData["menuItems.$." + attr] = data[attr];
    }
    const id = data.id;
    await Kitchen.updateOne(
      {
        ownerId: new mongoose.Types.ObjectId(req.user.userId),
        "menuItems._id": id,
      },
      { $set: updateData }
    );
    return res.json({ message: "Dish editted successfully." });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getKitchens,
  getMyKitchen,
  addKitchen,
  getKitchenDetails,
  addDish,
  editDish,
  removeDish,
  editKitchen,
  removeKitchen,
};
