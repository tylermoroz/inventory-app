function displayInventory(req, res) {
  res.send("Loading wares");
}

function displayWeapons(req, res) {
  res.send("Loading armamanets");
}

function displayTomes(req, res) {
  res.send("Loading spells");
}

function displayPotions(req, res) {
  res.send("Loading elixirs");
}

module.exports = {
  displayInventory,
  displayWeapons,
  displayTomes,
  displayPotions,
};
