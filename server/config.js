module.exports = {
    secret: process.env.JWT_SECRET || "superhienosalaisuus",
    database: process.env.MONGODB_URI || "mongodb://localhost/akat"
}
