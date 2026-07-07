const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const educationRoutes = require("./routes/educationRoutes");
app.use("/api/education", educationRoutes);

const healthcareRoutes = require("./routes/healthcareRoutes");
app.use("/api/healthcare", healthcareRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);


const tribeRoutes = require("./routes/tribeRoutes");
app.use("/api/tribes", tribeRoutes);


const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});