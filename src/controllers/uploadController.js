const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.upload = async (req, res, next) => {
  try {
    if (!req.files?.length)
      return res.status(400).json({ message: "No files provided" });
    const urls = [];
    for (const f of req.files) {
      const data = `data:${f.mimetype};base64,${f.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(data, {
        folder: "properties",
      });
      urls.push(result.secure_url);
    }
    res.json(urls);
  } catch (e) {
    next(e);
  }
};
