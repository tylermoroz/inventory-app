const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRoute");
const inventoryRouter = require("./routes/inventoryRoute");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/inventory", inventoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app -- running on port ${PORT}!`);
});
