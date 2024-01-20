const POOL = require("pg").Pool;
const pool = new POOL({
    user:"playabook",
    database:"econsensus",
    port:5432,
    password:"8896",
    host:"localhost"
})

module.exports = pool;