const express = require("express");
const app = express();
const path = require("node:path");
const inventoryRouter = require("./routes/inventoryRoute");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", inventoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app -- running on port ${PORT}!`);
});
