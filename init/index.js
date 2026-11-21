const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
main().then(() => {
  console.log('Connected to MongoDB');
}).catch(console.error);


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6af0b3f5d62c6543e4ae097f"}));
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
}

initDB();

