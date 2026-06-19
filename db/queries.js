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
      shop_inventory.type, 
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
      shop_inventory.type, 
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
      shop_inventory.type, 
      shop_inventory.value, 
      shop_inventory.weight
     FROM potions
     JOIN shop_inventory
      ON potions.shop_inventory_id = shop_inventory.id
    `
  );
  return rows;
}

async function insertInventoryBase(name, type, value, weight) {
  const result = await pool.query(
    `INSERT INTO shop_inventory (
      name, 
      type, 
      value, 
      weight
     ) 
     VALUES ($1, $2, $3, $4)`,
    [name, type, value, weight]
  );

  return result.rows[0].id;
}

async function insertWeapon(data) {
  const inventoryId = await insertInventoryBase(
    data.name,
    "weapon",
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
    "tome",
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
    "potion",
    data.value,
    data.weight
  );

  await pool.query(
    `INSERT INTO potions (
      shop_inventory_id,
      effect,
      duration,
      potion_type_id
     )
     VALUES ($1, $2, $3, $4)`,
    [inventoryId, data.effect, data.duration, data.potion_type_id]
  );
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
};
