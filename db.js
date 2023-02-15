const mysql2 = require("mysql2")
const { promisify } = require('util');
const { DB_USER, DB_HOST, DB_PWD, DB_DATABASE_NAME } = require("./config")

const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_DATABASE_NAME,
});


const getConnection = promisify(pool.getConnection).bind(pool);

module.exports ={
    db: pool.promise(),
    dbConnect : getConnection
}
