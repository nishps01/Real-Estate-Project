const Contact = require("../models/Contact");
exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Contact.create(req.body));
  } catch (e) {
    next(e);
  }
};
exports.all = async (req, res, next) => {
  try {
    res.json(await Contact.find().sort({ createdAt: -1 }));
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
