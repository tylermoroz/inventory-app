const links = require("../links");
const { body, validationResult, matchedData } = require("express-validator");
const wares = require("../db/storage");
const storage = require("../db/storage");

const validatePost = [
  body("type")
    .isIn(["weapon", "tome", "potion"])
    .withMessage("Invalid item type"),
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Item name must only contain letters.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Item name must be between 3 and 50 characters."),
  body("affinity")
    .isIn(["kinetic", "magic", "holy"])
    .withMessage("Invalid item affinity"),
];

function displayInventoryGet(req, res) {
  res.render("inventory", {
    title: "High Wreath Wares",
    links,
    wares: wares.getItems(),
  });
}

function displayWeaponsGet(req, res) {
  res.render("weapons", {
    title: "Weapons of High Wreath Wares",
    links,
    wares: wares.getItemByType("weapon"),
  });
}

function displayTomesGet(req, res) {
  res.render("tomes", {
    title: "Tomes of High Wreath Wares",
    links,
    wares: wares.getItemByType("tome"),
  });
}

function displayPotionsGet(req, res) {
  res.render("potions", {
    title: "Potions of High Wreath Wares",
    links,
    wares: wares.getItemByType("potion"),
  });
}

function createItemPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("inventory", {
      title: "High Wreath Wares",
      links,
      wares: wares.getItems(),
      errors: errors.array(),
    });
  }
  const { type, name, affinity } = matchedData(req);
  wares.addItem({ type, name, affinity });
  res.redirect("/");
}

function inventoryUpdateGet(req, res) {
  const item = wares.getItem(req.params.id);
  res.render("updateInventory", {
    title: "Update Inventory",
    item: item,
  });
}

function inventoryUpdatePost(req, res) {
  const item = wares.getItem(req.params.id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("updateInventory", {
      title: "Update Inventory",
      item: item,
      errors: errors.array(),
    });
  }
  const { type, name, affinity } = matchedData(req);
  wares.updateItem(req.params.id, { type, name, affinity });
  res.redirect("/");
}

function deleteItemPost(req, res) {
  wares.deleteItem(req.params.id);
  res.redirect("/");
}

module.exports = {
  displayInventoryGet,
  displayWeaponsGet,
  displayTomesGet,
  displayPotionsGet,
  createItemPost,
  validatePost,
  inventoryUpdateGet,
  inventoryUpdatePost,
  deleteItemPost,
};
