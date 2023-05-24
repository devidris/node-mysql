import { iQueryDatabase } from "./interface/IQueryDatabase";
import { table } from "console";
import mysql = require("mysql2");

export class QueryDatabase implements iQueryDatabase {
  #db: any;
  table_name!: string;
  constructor(db: any, table_name: string) {
    this.#db = db;
    this.table_name = table_name;
  }
  Get(column_name: string, where: string, value: string, limit: number = 1) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where}='${value}' LIMIT ${limit};`;
      const query = this.#db.query(sql, (err: Error, result: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          this.#db.releaseConnection(query);
          resolve(result);
        }
      });
    });
  }
}
