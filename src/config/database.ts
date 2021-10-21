import { Pool } from 'pg';

const env = process.env.NODE_ENV || 'development';
let connectionString;

if (env === 'development') {
    connectionString = {
        user: process.env.LOCAL_USER,
        database: process.env.LOCAL_DB,
        host: process.env.LOCAL_HOST,
        port: Number(process.env.LOCAL_PORT),
        password: process.env.LOCAL_PASS || undefined
    };
} else {
    connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
};

const pool = new Pool(connectionString);
pool.on('connect', () => console.log('connected to db'));

export default pool;
