
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app.js");

const port = process.env.PORT || 3000;

const dbUrl = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main().catch((err) => {
    console.error("Failed to start server:", err);
});
