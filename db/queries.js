const pool = require("./pool");

async function getAllInventory() {
  const { rows } = await pool.query("SELECT * FROM shop_inventory");
  return rows;
}

async function insertInventory(name, type, value, weight) {
  await pool.query(
    "INSERT INTO shop_inventory (name, type, value, weight) VALUES ($1, $2, $3, $4)",
    [name, type, value, weight]
  );
}

module.exports = {
  getAllInventory,
  insertInventory,
};
