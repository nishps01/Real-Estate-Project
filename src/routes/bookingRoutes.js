const r = require("express").Router();
const c = require("../controllers/bookingController");
const { auth, adminOnly } = require("../middleware/auth");
r.post("/", c.create);
r.get("/user/:email", c.userBookings);
r.delete("/delete/:id", c.cancel);
r.get("/", auth, adminOnly, c.all);
r.delete("/:id", auth, adminOnly, c.remove);
module.exports = r;
