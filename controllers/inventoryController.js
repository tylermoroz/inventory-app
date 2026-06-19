const links = require("../links");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

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

async function getInventory(req, res) {
  const inventory = await db.getAllInventory();
  console.log("Inventory: ", inventory);
  res.render("inventory", {
    title: "High Wreath Wares",
    links,
    inventory,
  });
}

async function getWeapons(req, res) {
  const weapons = await db.getAllWeapons();
  console.log("Weapons: ", weapons);
  res.render("weapons", {
    title: "Weapons of High Wreath Wares",
    links,
    weapons,
  });
}

async function getTomes(req, res) {
  const tomes = await db.getAllTomes();
  console.log("Tomes: ", tomes);
  res.render("tomes", {
    title: "Tomes of High Wreath Wares",
    links,
    tomes,
  });
}

async function getPotions(req, res) {
  const potions = await db.getAllPotions();
  console.log("Potions: ", potions);
  res.render("potions", {
    title: "Potions of High Wreath Wares",
    links,
    potions,
  });
}

async function createWeaponPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("weapons", {
      title: "Weapons of High Wreath Wares",
      links,
      db: db.getAllWeapons(),
      errors: errors.array(),
    });
  }
  console.log("BODY:", req.body);
  console.log("MATCHED:", matchedData(req));
  const data = matchedData(req);
  await db.insertWeapon(data);
  return res.redirect("/");
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
  getInventory,
  getWeapons,
  getTomes,
  getPotions,
  createWeaponPost,
  validatePost,
  inventoryUpdateGet,
  inventoryUpdatePost,
  deleteItemPost,
};
