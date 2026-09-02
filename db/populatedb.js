require("dotenv").config();
const pool = require("./pool");
const db = require("./queries");

const SQL = `
  CREATE TABLE IF NOT EXISTS item_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS weapon_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS affinity_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS spell_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS spell_school (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS potion_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shop_inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    value INTEGER DEFAULT 1,
    weight INTEGER DEFAULT 1,
    item_type_id INTEGER,

    CONSTRAINT shop_inventory_item_type_fk
      FOREIGN KEY (item_type_id)
      REFERENCES item_type(id),

    CONSTRAINT item_name_min_length
      CHECK (length(name) >= 1),
    
    CONSTRAINT item_value
      CHECK (value >= 1 AND value <= 1000),

    CONSTRAINT item_weight
      CHECK (weight >= 1 AND weight <= 100)
  );

  CREATE TABLE IF NOT EXISTS weapons (
    shop_inventory_id INTEGER NOT NULL,
    damage INTEGER NOT NULL,
    weapon_type_id INTEGER NOT NULL,
    durability INTEGER NOT NULL,
    affinity_type_id INTEGER NOT NULL,

    CONSTRAINT weapons_pkey
      PRIMARY KEY (shop_inventory_id),

    CONSTRAINT weapons_damage_range
      CHECK (damage >= 1 AND damage <= 1000),

    CONSTRAINT weapons_durability_range
      CHECK (durability >= 1 AND durability <= 100),

    CONSTRAINT weapons_affinity_type_id_fkey
      FOREIGN KEY (affinity_type_id)
      REFERENCES affinity_type(id),

    CONSTRAINT weapons_weapon_type_id_fkey
      FOREIGN KEY (weapon_type_id)
      REFERENCES weapon_type(id),

    CONSTRAINT weapons_shop_inventory_id_fkey
      FOREIGN KEY (shop_inventory_id)
      REFERENCES shop_inventory(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tomes (
    shop_inventory_id INTEGER NOT NULL,
    spell_type_id INTEGER NOT NULL,
    spell_school_id INTEGER NOT NULL,
    mana_cost INTEGER NOT NULL,

    CONSTRAINT tomes_pkey
      PRIMARY KEY (shop_inventory_id),

    CONSTRAINT mana_cost_range
      CHECK (mana_cost >= 1 AND mana_cost <= 100),

    CONSTRAINT tomes_spell_type_id_fkey
      FOREIGN KEY (spell_type_id)
      REFERENCES spell_type(id),

    CONSTRAINT tomes_spell_school_id_fkey
      FOREIGN KEY (spell_school_id)
      REFERENCES spell_school(id),

    CONSTRAINT tomes_shop_inventory_id_fkey
      FOREIGN KEY (shop_inventory_id)
      REFERENCES shop_inventory(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS potions (
    shop_inventory_id INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL,
    potion_type_id INTEGER NOT NULL,

    CONSTRAINT potions_pkey
      PRIMARY KEY (shop_inventory_id),

    CONSTRAINT duration_range
      CHECK (duration_seconds >= 1 AND duration_seconds <= 20),

    CONSTRAINT potions_potion_type_id_fkey
      FOREIGN KEY (potion_type_id)
      REFERENCES potion_type(id),

    CONSTRAINT potions_shop_inventory_id_fkey
      FOREIGN KEY (shop_inventory_id)
      REFERENCES shop_inventory(id)
      ON DELETE CASCADE
  );

  INSERT INTO item_type (name)
  VALUES 
    ('Weapon'), 
    ('Tome'), 
    ('Potion');

  INSERT INTO weapon_type (name)
  VALUES 
    ('Axe'), 
    ('Sword'), 
    ('Spear'), 
    ('Hammer'), 
    ('Mace'), 
    ('Dagger');

  INSERT INTO affinity_type (name)
  VALUES 
    ('Holy'), 
    ('Kinetic'), 
    ('Magic'), 
    ('Lightning'), 
    ('Flame'), 
    ('Ice');

  INSERT INTO spell_type (name)
  VALUES 
    ('Destruction'), 
    ('Blessing'), 
    ('Curse'), 
    ('Illusion'), 
    ('Conjuration');

  INSERT INTO spell_school (name)
  VALUES 
    ('Solari'), 
    ('Umbra'), 
    ('Voltaris'), 
    ('Astralis'), 
    ('Sanguis'), 
    ('Borealis');

  INSERT INTO potion_type (name)
  VALUES 
    ('Cleanse'), 
    ('Poison'), 
    ('Fortify'), 
    ('Weaken'), 
    ('Regeneration');
`;

async function main() {
  console.log("Populating database...");

  await pool.query(SQL);

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
    spell_school_id: 5,
    mana_cost: 15,
  });
  await db.insertTome({
    name: "Smite",
    value: 450,
    weight: 4,
    spell_type_id: 1,
    spell_school_id: 3,
    mana_cost: 15,
  });
  await db.insertTome({
    name: "Animate Shadow",
    value: 520,
    weight: 6,
    spell_type_id: 5,
    spell_school_id: 2,
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
