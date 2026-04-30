const { Router } = require("express");

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
  res.send("Loading wares");
});
inventoryRouter.get("/weapons", (req, res) => {
  res.send("Loading armaments");
});
inventoryRouter.get("/tomes", (req, res) => {
  res.send("Loading spells");
});
inventoryRouter.get("/potions", (req, res) => {
  res.send("Loading elixirs");
});

module.exports = inventoryRouter;
