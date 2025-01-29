import dotenv from 'dotenv';
import Database from 'better-sqlite3';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config(); 
} else {
    dotenv.config({ path: '.envProduction' }); 
}


const dbPath = process.env.DB_PATH;
const db = new Database(dbPath);
export { db }; 
