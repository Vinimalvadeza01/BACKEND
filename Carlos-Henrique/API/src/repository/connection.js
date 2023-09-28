import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({

    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

console.log('BD Conectado');

export default connection;