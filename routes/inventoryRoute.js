const { Router } = require("express");
const inventoryRouter = Router();
const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.displayInventoryGet);
inventoryRouter.get("/weapons", inventoryController.displayWeaponsGet);
inventoryRouter.get("/tomes", inventoryController.displayTomesGet);
inventoryRouter.get("/potions", inventoryController.displayPotionsGet);
inventoryRouter.post("/", inventoryController.createItemPost);

module.exports = inventoryRouter;
