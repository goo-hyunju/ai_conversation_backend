// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// async function testConnection() {
//     try {
//         const result = await pool.query('SELECT NOW()');
//         console.log('✅ DB 연결 성공! 현재 시간:', result.rows[0].now);
//     } catch (err) {
//         console.error('❌ DB 연결 실패:', err.message);
//     } finally {
//         await pool.end();
//     }
// }

// testConnection();
