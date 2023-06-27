const router = require("express").Router();

//import todo model
const todoItemsModel = require("../models/todoItems");

//post method to add an new item
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    //save this item to db
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//get method to get all item
router.get("/api/items", async (req, res) => {
  try {
    const listAllItems = await todoItemsModel.find({});
    res.status(200).json(listAllItems);
  } catch (err) {
    res.json(err);
  }
});

// put method to update item
router.put("/api/item/:id", async (req, res) => {
  try {
    //find the item by its id
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("item updated");
  } catch (err) {
    res.json(err);
  }
});

//delete method to delete item
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted");
  } catch (err) {
    res.json(err);
  }
});

//export router
module.exports = router;
