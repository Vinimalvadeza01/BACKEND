import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({

    host:process.env.PORT,
    user:process.env.PORT,
    password:process.env.PORT,
    database:process.env.PORT
});

console.log('BD Conectado');

export {connection};