import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env' });

const clientArgs = {
  user: process.env.DBUSER,
  password: 'asd123',
  host: process.env.DBHOST,
  database: 'postgres',
  port: Number(process.env.DBPORT),
};
const client = new Client(clientArgs);

(async () => {
  try {
    await client.connect();
    const res = await client.query(
      `SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DBNAME}')`
    );
    const { rows } = res;
    if (rows.length > 0) {
      const [{ exists }] = rows;
      if (!exists) {
        await client.query(`CREATE DATABASE ${process.env.DBNAME};`);
        console.log('Succesfully created Database.');
      } else {
        console.log('Skipped Database creation, already exists.');
      }
    }
    await client.end();
  } catch (e) {
    console.error(e.message);
  }
})();
