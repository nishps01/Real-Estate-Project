const r = require("express").Router();
const c = require("../controllers/contactController");
r.post("/", c.create);
module.exports = r;
