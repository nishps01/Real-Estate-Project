const r = require("express").Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});
const c = require("../controllers/adminController");
const contacts = require("../controllers/contactController");
const up = require("../controllers/uploadController");
const { auth, adminOnly } = require("../middleware/auth");
r.post("/create", c.create);
r.post("/login", c.login);
r.put("/approve/:id", auth, adminOnly, c.approve);
r.put("/reject/:id", auth, adminOnly, c.reject);
r.put("/:id", auth, adminOnly, c.update);
r.get("/users", auth, adminOnly, c.users);
r.delete("/users/:id", auth, adminOnly, c.deleteUser);
r.get("/contacts", auth, adminOnly, contacts.all);
r.delete("/contacts/:id", auth, adminOnly, contacts.remove);
r.post("/upload", auth, adminOnly, upload.array("file"), up.upload);
module.exports = r;
