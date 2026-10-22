require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const port = process.env.PORT || 3060;
connectDB()



  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`)),
  )
  .catch((e) => {
    console.error("Startup failed:", e.message);
    process.exit(1);
  });
