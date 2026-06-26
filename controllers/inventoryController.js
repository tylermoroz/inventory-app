const links = require("../links");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateWeaponPost = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Weapon name must only contain letters.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Weapon name must be between 1 and 50 characters."),
  body("weapon_type_id").notEmpty(),
  body("aaffinity_type_id").notEmpty(),
  body("damage").isInt({ min: 1, max: 1000 }),
  body("durability").isInt({ min: 1, max: 100 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
];

const validateTomePost = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Tome name must only contain letters.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Tome name must be between 1 and 50 characters."),
  body("spell_type_id").notEmpty(),
  body("spell_school_id").notEmpty(),
  body("mana_cost").isInt({ min: 1, max: 100 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
];

const validatePotionPost = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Potion name must only contain letters.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Potion name must be between 1 and 50 characters."),
  body("potion_type_id").notEmpty(),
  body("duration").isInt({ min: 1, max: 20 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
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
  return res.redirect("/weapons");
}

async function createTomePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("tomes", {
      title: "Tomes of High Wreath Wares",
      links,
      db: db.getAllTomes(),
      errors: errors.array(),
    });
  }
  console.log("BODY:", req.body);
  console.log("MATCHED:", matchedData(req));
  const data = matchedData(req);
  await db.insertTome(data);
  return res.redirect("/tomes");
}

async function createPotionPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("potions", {
      title: "Potions of High Wreath Wares",
      links,
      db: db.getAllPotions(),
      errors: errors.array(),
    });
  }
  console.log("BODY:", req.body);
  console.log("MATCHED:", matchedData(req));
  const data = matchedData(req);
  await db.insertPotion(data);
  return res.redirect("/potions");
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
  createTomePost,
  createPotionPost,
  validateWeaponPost,
  validateTomePost,
  validatePotionPost,
  inventoryUpdateGet,
  inventoryUpdatePost,
  deleteItemPost,
};
