const { Router } = require("express");
const inventoryRouter = Router();
const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.getInventory);

inventoryRouter.get("/weapons", inventoryController.getWeapons);
inventoryRouter.post(
  "/weapons",
  inventoryController.validateWeaponPost,
  inventoryController.createWeaponPost
);

inventoryRouter.get("/tomes", inventoryController.getTomes);
inventoryRouter.post(
  "/tomes",
  inventoryController.validateTomePost,
  inventoryController.createTomePost
);

inventoryRouter.get("/potions", inventoryController.getPotions);
inventoryRouter.post(
  "/potions",
  inventoryController.validatePotionPost,
  inventoryController.createPotionPost
);

inventoryRouter.get("/weapons/:id/update", inventoryController.weaponUpdateGet);
inventoryRouter.post(
  "/weapons/:id/update",
  inventoryController.validateWeaponPost,
  inventoryController.weaponUpdatePost
);

inventoryRouter.get("/tomes/:id/update", inventoryController.tomeUpdateGet);
inventoryRouter.post(
  "/tomes/:id/update",
  inventoryController.validateTomePost,
  inventoryController.updateTomePost
);

inventoryRouter.get("/potions/:id/update", inventoryController.potionUpdateGet);
inventoryRouter.post(
  "/potions/:id/update",
  inventoryController.validatePotionPost,
  inventoryController.updatePotionPost
);

inventoryRouter.post("/:id/delete", inventoryController.deleteItemPost);

module.exports = inventoryRouter;
