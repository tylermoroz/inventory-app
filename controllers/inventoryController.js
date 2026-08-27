const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateWeaponPost = [
  body("name")
    .trim()
    .matches(/^[a-zA-Z\s'-]+$/)
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
    .matches(/^[a-zA-Z\s'-]+$/)
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
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("Potion name must only contain letters, spaces, or hyphens.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Potion name must be between 1 and 50 characters."),
  body("potion_type_id").notEmpty(),
  body("duration_seconds").isInt({ min: 1, max: 20 }),
  body("weight").isInt({ min: 1, max: 100 }),
  body("value").isInt({ min: 1, max: 1000 }),
];

async function getInventory(req, res) {
  const [
    inventory,
    weapons,
    itemTypes,
    weaponTypes,
    affinityTypes,
    tomes,
    spellTypes,
    spellSchools,
    potions,
    potionTypes,
  ] = await Promise.all([
    db.getAllInventory(),
    db.getAllWeapons(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getAllTomes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getAllPotions(),
    db.getPotionTypes(),
  ]);
  res.render("inventory", {
    title: "High Wreath Wares",
    inventory,
    weapons,
    itemTypes,
    weaponTypes,
    affinityTypes,
    tomes,
    spellTypes,
    spellSchools,
    potions,
    potionTypes,
  });
}

async function getWeapons(req, res) {
  const [
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  ] = await Promise.all([
    db.getAllWeapons(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getItemTypes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getPotionTypes(),
  ]);
  res.render("weapons/weapons", {
    title: "Weapons of High Wreath Wares",
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  });
}

async function getWeaponsByType(req, res) {
  const [
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  ] = await Promise.all([
    db.getWeaponsByType(req.params.type),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getItemTypes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getPotionTypes(),
  ]);
  res.render("weapons/weapons", {
    title: `${req.params.type}s of High Wreath Wares`,
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  });
}

async function getWeaponsByAffinity(req, res) {
  const [
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  ] = await Promise.all([
    db.getWeaponsByAffinity(req.params.affinity),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getItemTypes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getPotionTypes(),
  ]);
  res.render("weapons/weapons", {
    title: `${req.params.affinity} Weapons of High Wreath Wares`,
    weapons,
    weaponTypes,
    affinityTypes,
    itemTypes,
    spellTypes,
    spellSchools,
    potionTypes,
  });
}

async function getTomes(req, res) {
  const [
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  ] = await Promise.all([
    db.getAllTomes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getPotionTypes(),
  ]);
  res.render("tomes/tomes", {
    title: "Tomes of High Wreath Wares",
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  });
}

async function getTomesBySpellType(req, res) {
  const [
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  ] = await Promise.all([
    db.getTomesBySpellType(req.params.type),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getPotionTypes(),
  ]);
  res.render("tomes/tomes", {
    title: `${req.params.type} Tomes of High Wreath Wares`,
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  });
}

async function getTomesBySpellSchool(req, res) {
  const [
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  ] = await Promise.all([
    db.getTomesBySpellSchool(req.params.school),
    db.getSpellTypes(),
    db.getSpellSchools(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getPotionTypes(),
  ]);
  res.render("tomes/tomes", {
    title: `${req.params.school} Tomes of High Wreath Wares`,
    tomes,
    spellTypes,
    spellSchools,
    itemTypes,
    weaponTypes,
    affinityTypes,
    potionTypes,
  });
}

async function getPotions(req, res) {
  const [
    potions,
    potionTypes,
    itemTypes,
    weaponTypes,
    affinityTypes,
    spellTypes,
    spellSchools,
  ] = await Promise.all([
    db.getAllPotions(),
    db.getPotionTypes(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
  ]);
  res.render("potions/potions", {
    title: "Potions of High Wreath Wares",
    potions,
    potionTypes,
    itemTypes,
    weaponTypes,
    affinityTypes,
    spellTypes,
    spellSchools,
  });
}

async function getPotionsByType(req, res) {
  const [
    potions,
    potionTypes,
    itemTypes,
    weaponTypes,
    affinityTypes,
    spellTypes,
    spellSchools,
  ] = await Promise.all([
    db.getPotionsByType(req.params.type),
    db.getPotionTypes(),
    db.getItemTypes(),
    db.getWeaponTypes(),
    db.getAffinityTypes(),
    db.getSpellTypes(),
    db.getSpellSchools(),
  ]);
  res.render("potions/potions", {
    title: `${req.params.type} Potions of High Wreath Wares`,
    potions,
    potionTypes,
    itemTypes,
    weaponTypes,
    affinityTypes,
    spellTypes,
    spellSchools,
  });
}

async function createWeaponPost(req, res) {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    const [
      weapons,
      weaponTypes,
      affinityTypes,
      itemTypes,
      spellTypes,
      spellSchools,
      potionTypes,
    ] = await Promise.all([
      db.getAllWeapons(),
      db.getWeaponTypes(),
      db.getAffinityTypes(),
      db.getItemTypes(),
      db.getSpellTypes(),
      db.getSpellSchools(),
      db.getPotionTypes(),
    ]);
    return res.status(400).render("weapons/weapons", {
      title: "Weapons of High Wreath Wares",
      weapons,
      weaponTypes,
      affinityTypes,
      itemTypes,
      spellTypes,
      spellSchools,
      potionTypes,
      errors: errors.array(),
    });
  }
  const data = matchedData(req);
  await db.insertWeapon(data);
  return res.redirect("/weapons");
}

async function createTomePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [
      tomes,
      spellTypes,
      spellSchools,
      itemTypes,
      weaponTypes,
      affinityTypes,
      potionTypes,
    ] = await Promise.all([
      db.getAllTomes(),
      db.getSpellTypes(),
      db.getSpellSchools(),
      db.getItemTypes(),
      db.getWeaponTypes(),
      db.getAffinityTypes(),
      db.getPotionTypes(),
    ]);
    return res.status(400).render("tomes/tomes", {
      title: "Tomes of High Wreath Wares",
      tomes,
      spellTypes,
      spellSchools,
      itemTypes,
      weaponTypes,
      affinityTypes,
      potionTypes,
      errors: errors.array(),
    });
  }
  const data = matchedData(req);
  await db.insertTome(data);
  return res.redirect("/tomes");
}

async function createPotionPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [
      potions,
      potionTypes,
      itemTypes,
      weaponTypes,
      affinityTypes,
      spellTypes,
      spellSchools,
    ] = await Promise.all([
      db.getAllPotions(),
      db.getPotionTypes(),
      db.getItemTypes(),
      db.getWeaponTypes(),
      db.getAffinityTypes(),
      db.getSpellTypes(),
      db.getSpellSchools(),
    ]);
    return res.status(400).render("potions/potions", {
      title: "Potions of High Wreath Wares",
      potions,
      potionTypes,
      itemTypes,
      weaponTypes,
      affinityTypes,
      spellTypes,
      spellSchools,
      errors: errors.array(),
    });
  }
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

  res.render("weapons/updateWeapon", {
    title: "Update Weapon",
    weapon,
    weaponTypes,
    affinityTypes,
  });
}

async function tomeUpdateGet(req, res) {
  const [tome, spellTypes, spellSchools] = await Promise.all([
    db.getTome(req.params.id),
    db.getSpellTypes(),
    db.getSpellSchools(),
  ]);

  res.render("tomes/updateTome", {
    title: "Update Tome",
    tome,
    spellTypes,
    spellSchools,
  });
}

async function potionUpdateGet(req, res) {
  const [potion, potionTypes] = await Promise.all([
    db.getPotion(req.params.id),
    db.getPotionTypes(),
  ]);

  res.render("potions/updatePotion", {
    title: "Update Potion",
    potion,
    potionTypes,
  });
}

async function weaponUpdatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [dbWeapon, weaponTypes, affinityTypes] = await Promise.all([
      db.getWeapon(req.params.id),
      db.getWeaponTypes(),
      db.getAffinityTypes(),
    ]);

    const weapon = {
      ...dbWeapon,
      ...req.body,
    };

    return res.status(400).render("weapons/updateWeapon", {
      title: "Update Weapon",
      weapon,
      weaponTypes,
      affinityTypes,
      errors: errors.array(),
    });
  }
  const data = matchedData(req);
  await db.updateWeapon(req.params.id, data);
  res.redirect("/weapons");
}

async function updateTomePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [dbTome, spellTypes, spellSchools] = await Promise.all([
      db.getTome(req.params.id),
      db.getSpellTypes(),
      db.getSpellSchools(),
    ]);

    const tome = {
      ...dbTome,
      ...req.body,
    };

    return res.status(400).render("tomes/updateTome", {
      title: "Update Tome",
      tome,
      spellTypes,
      spellSchools,
      errors: errors.array(),
    });
  }
  const data = matchedData(req);
  await db.updateTome(req.params.id, data);
  res.redirect("/tomes");
}

async function updatePotionPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [dbPotion, potionTypes] = await Promise.all([
      db.getPotion(req.params.id),
      db.getPotionTypes(),
    ]);

    const potion = {
      ...dbPotion,
      ...req.body,
    };

    return res.status(400).render("potions/updatePotion", {
      title: "Update Potion",
      potion,
      potionTypes,
      errors: errors.array(),
    });
  }
  const data = matchedData(req);
  await db.updatePotion(req.params.id, data);
  res.redirect("/potions");
}

async function deleteItemPost(req, res) {
  await db.deleteItem(req.params.id);
  res.redirect(req.get("Referer") || "/");
}

module.exports = {
  getInventory,
  getWeapons,
  getWeaponsByType,
  getWeaponsByAffinity,
  getTomes,
  getTomesBySpellType,
  getTomesBySpellSchool,
  getPotions,
  getPotionsByType,
  createWeaponPost,
  createTomePost,
  createPotionPost,
  validateWeaponPost,
  validateTomePost,
  validatePotionPost,
  weaponUpdateGet,
  tomeUpdateGet,
  potionUpdateGet,
  weaponUpdatePost,
  updateTomePost,
  updatePotionPost,
  deleteItemPost,
};
