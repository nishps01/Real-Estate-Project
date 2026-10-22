const express = require("express");

const cors = require("cors");

const errorHandler = require("./middleware/error");

const app = express();

app.use(cors());


app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "UP" }));

app.use("/auth", require("./routes/authRoutes"));

app.use("/properties", require("./routes/propertyRoutes"));

app.use("/bookings", require("./routes/bookingRoutes"));

app.use("/admin/bookings", require("./routes/adminBookingRoutes"));

app.use("/contacts", require("./routes/contactRoutes"));

app.use("/admin", require("./routes/adminRoutes"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use(errorHandler);

module.exports = app;
