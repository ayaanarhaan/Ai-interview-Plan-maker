const mongoose  = require('mongoose')
const dns = require('dns')

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to database")

    } catch (err) {
        console.log(err)
    }
}
module.exports = connectDB