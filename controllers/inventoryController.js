const links = require("../links");

function displayInventory(req, res) {
  res.render("inventory", {
    title: "High Reath Wares",
    links,
  });
}

function displayWeapons(req, res) {
  res.render("weapons", {
    title: "Weapons of High Reath Wares",
    links,
  });
}

function displayTomes(req, res) {
  res.render("tomes", {
    title: "Tomes of High Reath Wares",
    links,
  });
}

function displayPotions(req, res) {
  res.render("potions", {
    title: "Potions of High Reath Wares",
    links,
  });
}

module.exports = {
  displayInventory,
  displayWeapons,
  displayTomes,
  displayPotions,
};
