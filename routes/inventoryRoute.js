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

inventoryRouter.get("/:id/update", inventoryController.inventoryUpdateGet);
// inventoryRouter.post(
//   "/:id/update",
//   inventoryController.validatePost,
//   inventoryController.inventoryUpdatePost
// );
inventoryRouter.post("/:id/delete", inventoryController.deleteItemPost);

module.exports = inventoryRouter;
