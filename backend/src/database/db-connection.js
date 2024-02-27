import createConnectionPool from "./db.js";

export const db = createConnectionPool(process.env.MYSQL_DB);
