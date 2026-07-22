const pool = require("./pool");

async function getAllInventory() {
  const { rows } = await pool.query(`SELECT * FROM shop_inventory`);
  return rows;
}

async function getAllWeapons() {
  const { rows } = await pool.query(
    `SELECT 
      weapons.*, 
      shop_inventory.name, 
      shop_inventory.item_type_id, 
      shop_inventory.value, 
      shop_inventory.weight
     FROM weapons
     JOIN shop_inventory 
      ON weapons.shop_inventory_id = shop_inventory.id
    `
  );
  return rows;
}

async function getAllTomes() {
  const { rows } = await pool.query(
    `SELECT 
      tomes.*, 
      shop_inventory.name, 
      shop_inventory.item_type_id, 
      shop_inventory.value, 
      shop_inventory.weight
     FROM tomes
     JOIN shop_inventory
      ON tomes.shop_inventory_id = shop_inventory.id
    `
  );
  return rows;
}

async function getAllPotions() {
  const { rows } = await pool.query(
    `SELECT 
      potions.*, 
      shop_inventory.name, 
      shop_inventory.item_type_id, 
      shop_inventory.value, 
      shop_inventory.weight
     FROM potions
     JOIN shop_inventory
      ON potions.shop_inventory_id = shop_inventory.id
    `
  );
  return rows;
}

async function insertInventoryBase(name, itemTypeId, value, weight) {
  const result = await pool.query(
    `INSERT INTO shop_inventory (
      name, 
      item_type_id, 
      value, 
      weight
     ) 
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [name, itemTypeId, value, weight]
  );

  return result.rows[0].id;
}

async function insertWeapon(data) {
  const inventoryId = await insertInventoryBase(
    data.name,
    1,
    data.value,
    data.weight
  );

  await pool.query(
    `INSERT INTO weapons (
      shop_inventory_id,
      damage,
      weapon_type_id,
      durability,
      affinity_type_id
     )
     VALUES ($1, $2, $3, $4, $5)`,
    [
      inventoryId,
      data.damage,
      data.weapon_type_id,
      data.durability,
      data.affinity_type_id,
    ]
  );
}

async function insertTome(data) {
  const inventoryId = await insertInventoryBase(
    data.name,
    2,
    data.value,
    data.weight
  );

  await pool.query(
    `INSERT INTO tomes (
      shop_inventory_id,
      spell_type_id,
      spell_school_id,
      mana_cost
     )
     VALUES ($1, $2, $3, $4)`,
    [inventoryId, data.spell_type_id, data.spell_school_id, data.mana_cost]
  );
}

async function insertPotion(data) {
  const inventoryId = await insertInventoryBase(
    data.name,
    3,
    data.value,
    data.weight
  );

  await pool.query(
    `INSERT INTO potions (
      shop_inventory_id,
      duration_seconds,
      potion_type_id
     )
     VALUES ($1, $2, $3)`,
    [inventoryId, data.duration_seconds, data.potion_type_id]
  );
}

async function getWeaponTypes() {
  const { rows } = await pool.query(`SELECT id, name FROM weapon_type`);
  return rows;
}

async function getAffinityTypes() {
  const { rows } = await pool.query(`SELECT id, name FROM affinity_type`);
  return rows;
}

async function getSpellTypes() {
  const { rows } = await pool.query(`SELECT id, name FROM spell_type`);
  return rows;
}

async function getSpellSchools() {
  const { rows } = await pool.query(`SELECT id, name FROM spell_school`);
  return rows;
}

async function getPotionTypes() {
  const { rows } = await pool.query(`SELECT id, name FROM potion_type`);
  return rows;
}

async function getItemTypes() {
  const { rows } = await pool.query(`SELECT name FROM item_type;`);
  return rows;
}

async function getWeapon(id) {
  const { rows } = await pool.query(
    `SELECT weapons.*, 
      shop_inventory.id,
      shop_inventory.name, 
      shop_inventory.item_type_id, 
      shop_inventory.value, 
      shop_inventory.weight
     FROM shop_inventory
     JOIN weapons 
      ON weapons.shop_inventory_id = shop_inventory.id 
     WHERE shop_inventory.id = $1`,
    [id]
  );
  return rows[0];
}

async function getTome(id) {
  const { rows } = await pool.query(
    `SELECT tomes.*,
      shop_inventory.id,
      shop_inventory.name,
      shop_inventory.item_type_id,
      shop_inventory.value,
      shop_inventory.weight
     FROM shop_inventory
     JOIN tomes
      ON tomes.shop_inventory_id = shop_inventory.id
     WHERE shop_inventory.id = $1`,
    [id]
  );
  return rows[0];
}

async function getPotion(id) {
  const { rows } = await pool.query(
    `SELECT potions.*,
      shop_inventory.id,
      shop_inventory.name,
      shop_inventory.item_type_id,
      shop_inventory.value,
      shop_inventory.weight
     FROM shop_inventory
     JOIN potions
      ON potions.shop_inventory_id = shop_inventory.id
     WHERE shop_inventory.id = $1`,
    [id]
  );
  return rows[0];
}

module.exports = {
  getAllInventory,
  getAllWeapons,
  getAllTomes,
  getAllPotions,
  insertInventoryBase,
  insertWeapon,
  insertTome,
  insertPotion,
  getWeaponTypes,
  getAffinityTypes,
  getSpellTypes,
  getSpellSchools,
  getPotionTypes,
  getItemTypes,
  getWeapon,
  getTome,
  getPotion,
};
