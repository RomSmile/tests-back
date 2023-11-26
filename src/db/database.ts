import { Pool } from 'pg';
require('dotenv-safe').config();

const pool: typeof Pool = new Pool({
    user: 'postgres',
    password: '10092003',
    host: 'localhost',
    port: 5432,
    database: 'exercises'
})

export default pool;
