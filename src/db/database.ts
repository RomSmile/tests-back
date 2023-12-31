import { Pool } from 'pg';
require('dotenv-safe').config();

const db: typeof Pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionString: process.env.DATABASE_URL,
})

export default db;
