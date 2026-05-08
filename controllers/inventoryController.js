const links = require("../links");
const { body, validationResult } = require("express-validator");
const wares = require("../db/storage");

function displayInventoryGet(req, res) {
  res.render("inventory", {
    title: "High Reath Wares",
    links,
    wares: wares.getItems(),
  });
}

function displayWeaponsGet(req, res) {
  res.render("weapons", {
    title: "Weapons of High Reath Wares",
    links,
    wares: wares.getItemByType("weapon"),
  });
}

function displayTomesGet(req, res) {
  res.render("tomes", {
    title: "Tomes of High Reath Wares",
    links,
    wares: wares.getItemByType("tome"),
  });
}

function displayPotionsGet(req, res) {
  res.render("potions", {
    title: "Potions of High Reath Wares",
    links,
    wares: wares.getItemByType("potion"),
  });
}

function createItemPost(req, res) {
  const { type, name } = req.body;
  wares.addItem({ type, name });
  res.redirect("/");
}

module.exports = {
  displayInventoryGet,
  displayWeaponsGet,
  displayTomesGet,
  displayPotionsGet,
  createItemPost,
};
