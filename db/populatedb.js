require("dotenv").config();
const pool = require("./pool");
const db = require("./queries");

async function main() {
  console.log("Populating database...");

  await db.insertWeapon({
    name: "Night Baron",
    value: 932,
    weight: 45,
    damage: 852,
    weapon_type_id: 2,
    durability: 87,
    affinity_type_id: 3,
  });
  await db.insertWeapon({
    name: "Resonating Bell",
    value: 653,
    weight: 28,
    damage: 380,
    weapon_type_id: 5,
    durability: 90,
    affinity_type_id: 1,
  });
  await db.insertWeapon({
    name: "Reach of Infinity",
    value: 498,
    weight: 25,
    damage: 672,
    weapon_type_id: 3,
    durability: 49,
    affinity_type_id: 4,
  });

  await db.insertTome({
    name: "Hematic Reversal",
    value: 250,
    weight: 2,
    spell_type_id: 3,
    spell_school_id: 9,
    mana_cost: 15,
  });
  await db.insertTome({
    name: "Smite",
    value: 450,
    weight: 4,
    spell_type_id: 1,
    spell_school_id: 7,
    mana_cost: 15,
  });
  await db.insertTome({
    name: "Animate Shadow",
    value: 520,
    weight: 6,
    spell_type_id: 5,
    spell_school_id: 4,
    mana_cost: 36,
  });

  await db.insertPotion({
    name: "Invigorate",
    value: 120,
    weight: 3,
    duration_seconds: 15,
    potion_type_id: 5,
  });
  await db.insertPotion({
    name: "Anti-drain",
    value: 70,
    weight: 1,
    duration_seconds: 1,
    potion_type_id: 1,
  });
  await db.insertPotion({
    name: "Osteo Debase",
    value: 320,
    weight: 5,
    duration_seconds: 20,
    potion_type_id: 4,
  });

  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await pool.end();
  });
