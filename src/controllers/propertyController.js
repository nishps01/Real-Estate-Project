const Property = require("../models/Property");
const pageData = async (filter, page = 0, size = 6) => {
  const skip = Number(page) * Number(size);
  const [content, totalElements] = await Promise.all([
    Property.find(filter)
      .skip(skip)
      .limit(Number(size))
      .sort({ createdAt: -1 }),
    Property.countDocuments(filter),
  ]);
  return {
    content,
    totalElements,
    totalPages: Math.ceil(totalElements / size),
    number: Number(page),
    size: Number(size),
  };
};
exports.getAll = async (req, res, next) => {
  try {
    res.json(await pageData({}, req.query.page, req.query.size));
  } catch (e) {
    next(e);
  }
};
exports.byType = async (req, res, next) => {
  try {
    res.json(
      await pageData(
        { type: req.params.type.toUpperCase() },
        req.query.page,
        req.query.size,
      ),
    );
  } catch (e) {
    next(e);
  }
};
exports.featured = async (req, res, next) => {
  try {
    res.json(
      await pageData({ featured: true }, req.query.page, req.query.size),
    );
  } catch (e) {
    next(e);
  }
};
exports.getById = async (req, res, next) => {
  try {
    const p = await Property.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Property not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};
exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Property.create(req.body));
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    const p = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!p) return res.status(404).json({ message: "Property not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
exports.search = async (req, res, next) => {
  try {
    const {
      location = "",
      minPrice = 0,
      maxPrice = Number.MAX_SAFE_INTEGER,
      page = 0,
    } = req.query;
    res.json(
      await pageData(
        {
          location: { $regex: location, $options: "i" },
          price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
        },
        page,
        6,
      ),
    );
  } catch (e) {
    next(e);
  }
};
