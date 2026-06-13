const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderland";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connected to Db");
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

main()
    .then(() => initDB())
    .then(() => {
        console.log("Initialization complete");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });
