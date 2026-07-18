const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateWeaponPost = [
  body("name")
    .trim()
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage("Weapon name must only contain letters, spaces, or hyphens.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Weapon name must be between 1 and 50 characters."),
  body("weapon_type_id").notEmpty(),
  body("affinity_type_id").notEmpty(),
  body("damage").isInt({ min: 1, max: 1000 }),
  body("durability").isInt({ min: 1, max: 100 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
];

const validateTomePost = [
  body("name")
    .trim()
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage("Tome name must only contain letters, spaces, or hyphens.")
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
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage("Potion name must only contain letters, spaces, or hyphens.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Potion name must be between 1 and 50 characters."),
  body("potion_type_id").notEmpty(),
  body("duration_seconds").isInt({ min: 1, max: 20 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
];

async function getInventory(req, res) {
  const [inventory, itemTypes] = await Promise.all([
    db.getAllInventory(),
    db.getItemTypes(),
  ]);
  console.log("Inventory: ", inventory);
  res.render("inventory", {
    title: "High Wreath Wares",
    itemTypes,
    inventory,
  });
}

async function getWeapons(req, res) {
  const [weapons, weaponTypes, affinityTypes, itemTypes] = await Promise.all([
    db.getAllWeapons(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getItemTypes(),
  ]);
  console.log("Weapons: ", weapons);
  res.render("weapons", {
    title: "Weapons of High Wreath Wares",
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
  });
}

async function getTomes(req, res) {
  const [tomes, spellTypes, spellSchools, itemTypes] = await Promise.all([
    db.getAllTomes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getItemTypes(),
  ]);
  console.log("Tomes: ", tomes);
  res.render("tomes", {
    title: "Tomes of High Wreath Wares",
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
  });
}

async function getPotions(req, res) {
  const [potions, potionTypes, itemTypes] = await Promise.all([
    db.getAllPotions(),
    db.getPotionTypes(),
    db.getItemTypes(),
  ]);
  console.log("Potions: ", potions);
  res.render("potions", {
    title: "Potions of High Wreath Wares",
    potions,
    potionTypes,
    itemTypes,
  });
}

async function createWeaponPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("ERRORS: ", errors);
    const [weapons, weaponTypes, affinityTypes, itemTypes] = await Promise.all([
      db.getAllWeapons(),
      db.getWeaponTypes(),
      db.getAffinityTypes(),
      db.getItemTypes(),
    ]);

    return res.status(400).render("weapons", {
      title: "Weapons of High Wreath Wares",
      weapons,
      weaponTypes,
      affinityTypes,
      itemTypes,
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
    const [tomes, spellTypes, spellSchools, itemTypes] = await Promise.all([
      db.getAllTomes(),
      db.getSpellTypes(),
      db.getSpellSchools(),
      db.getItemTypes(),
    ]);
    return res.status(400).render("tomes", {
      title: "Tomes of High Wreath Wares",
      tomes,
      spellTypes,
      spellSchools,
      itemTypes,
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
    const [potions, potionTypes, itemTypes] = await Promise.all([
      db.getAllPotions(),
      db.getPotionTypes(),
      db.getItemTypes(),
    ]);
    return res.status(400).render("potions", {
      title: "Potions of High Wreath Wares",
      potions,
      potionTypes,
      itemTypes,
      errors: errors.array(),
    });
  }
  console.log("BODY:", req.body);
  console.log("MATCHED:", matchedData(req));
  const data = matchedData(req);
  await db.insertPotion(data);
  return res.redirect("/potions");
}

async function weaponUpdateGet(req, res) {
  const [weapon, weaponTypes, affinityTypes] = await Promise.all([
    db.getWeapon(req.params.id),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
  ]);

  console.log("WEAPON: ", weapon);

  res.render("updateWeapon", {
    title: "Update Weapon",
    weapon,
    weaponTypes,
    affinityTypes,
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
  weaponUpdateGet,
  inventoryUpdatePost,
  deleteItemPost,
};
