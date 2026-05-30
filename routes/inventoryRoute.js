const { Router } = require("express");
const inventoryRouter = Router();
const inventoryController = require("../controllers/inventoryController");
const { inventory } = require("../db/storage");

inventoryRouter.get("/", inventoryController.displayInventoryGet);
inventoryRouter.get("/weapons", inventoryController.displayWeaponsGet);
inventoryRouter.get(
  "/weapons/:affinity",
  inventoryController.displayWeaponAffinityGet
);
inventoryRouter.get("/tomes", inventoryController.displayTomesGet);
inventoryRouter.get(
  "/tomes/:affinity",
  inventoryController.displayTomeAffinityGet
);
inventoryRouter.get("/potions", inventoryController.displayPotionsGet);
inventoryRouter.get(
  "/potions/:affinity",
  inventoryController.displayPotionAffinityGet
);
inventoryRouter.post(
  "/",
  inventoryController.validatePost,
  inventoryController.createItemPost
);
inventoryRouter.get("/:id/update", inventoryController.inventoryUpdateGet);
inventoryRouter.post(
  "/:id/update",
  inventoryController.validatePost,
  inventoryController.inventoryUpdatePost
);
inventoryRouter.post("/:id/delete", inventoryController.deleteItemPost);

module.exports = inventoryRouter;
