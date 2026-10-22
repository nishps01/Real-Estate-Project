const r = require("express").Router();
const c = require("../controllers/bookingController");
const { auth, adminOnly } = require("../middleware/auth");
r.use(auth, adminOnly);
r.get("/", c.all);
r.put("/:id/status", c.updateStatus);
module.exports = r;
