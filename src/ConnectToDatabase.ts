import mysql = require("mysql2");
export function ConnectToDatabase(
  host: string,
  user: string,
  password: string,
  database: string
) {
  if(!host || host === ''){
    throw new Error("Host is not defined")
  }
  if(!user || user === ''){
    throw new Error("Username is not defined")
  }
  if(!password || password === ''){
    throw new Error("Password is not defined")
  }
  if(!database || database === ''){
    throw new Error("Database is not defined")
  }
  return mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
