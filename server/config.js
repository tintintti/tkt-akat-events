module.exports = {
    secret: process.env.JWT_SECRET || "superhienosalaisuus",
    database: process.env.MONGODB_URI || "mongodb://localhost/akat",
    mailgun: {apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN}
}
