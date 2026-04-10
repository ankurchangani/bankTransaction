const mongoose = require("mongoose");
const dns = require("dns")

dns.setServers(["1.1.1.1" , "8.8.8.8"])

function connectToDB() {

    console.log("MONGO_URL:", process.env.MONGO_URL); // 👈 ahi muk

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("server is connected to DB");
        })
        .catch(err => {
            console.log("error", err);
        });
}

module.exports = connectToDB;