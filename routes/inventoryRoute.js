const { Router } = require("express");
const inventoryRouter = Router();
const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.displayInventory);
inventoryRouter.get("/weapons", inventoryController.displayWeapons);
inventoryRouter.get("/tomes", inventoryController.displayTomes);
inventoryRouter.get("/potions", inventoryController.displayPotions);

module.exports = inventoryRouter;
