import path from 'path';

export const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../tasks.db');
