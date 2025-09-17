const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Connect to Local MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/deals", require("./routes/dealRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
