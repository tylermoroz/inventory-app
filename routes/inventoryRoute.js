const { Router } = require("express");
const inventoryRouter = Router();
const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.getInventory);
inventoryRouter.get("/weapons", inventoryController.getWeapons);
// inventoryRouter.get(
//   "/weapons/:affinity",
//   inventoryController.displayWeaponAffinityGet
// );
inventoryRouter.post("/weapons", inventoryController.createWeaponPost);
inventoryRouter.get("/tomes", inventoryController.getTomes);
// inventoryRouter.get(
//   "/tomes/:affinity",
//   inventoryController.displayTomeAffinityGet
// );
inventoryRouter.get("/potions", inventoryController.getPotions);
// inventoryRouter.get(
//   "/potions/:affinity",
//   inventoryController.displayPotionAffinityGet
// );
inventoryRouter.post(
  "/",
  inventoryController.validatePost,
  inventoryController.createWeaponPost
);
inventoryRouter.get("/:id/update", inventoryController.inventoryUpdateGet);
inventoryRouter.post(
  "/:id/update",
  inventoryController.validatePost,
  inventoryController.inventoryUpdatePost
);
inventoryRouter.post("/:id/delete", inventoryController.deleteItemPost);

module.exports = inventoryRouter;
