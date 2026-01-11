const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "yesset",
    password: "873490E$",
    database: "TimeManagementSystem",
    port: 5432,
});

async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS items (
                                             id SERIAL PRIMARY KEY,
                                             title TEXT NOT NULL,
                                             description TEXT NOT NULL
        )
    `);
}

initDB();

module.exports = pool;
