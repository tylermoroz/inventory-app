const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Setting up shop");
});

module.exports = indexRouter;
