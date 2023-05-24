import { IGetMultiple, IQueryDatabase } from "./interface/IQueryDatabase";
import { table } from "console";
import mysql = require("mysql2");

export class QueryDatabase implements IQueryDatabase {
  #db: any;
  table_name!: string;
  constructor(db: any, table_name: string) {
    this.#db = db;
    this.table_name = table_name;
  }
  Get(
    column_name: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    return new Promise((resolve, reject) => {
      let sql: string;
      if (!limit) {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where}='${value}';`;
      } else {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where}='${value}' LIMIT ${limit};`;
      }
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

  GetAdvanced(params: IGetMultiple, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      if (!params.column_name) throw new Error("params.column_name is not set");
      if (!Array.isArray(params.column_name))
        throw new Error("params.column_name is meant to be an array");
      if (params.column_name.length < 1)
        throw new Error("params.column_name must have a value");

      if (!params.where) throw new Error("params.where is not set");
      if (Object.prototype.toString.call(params.where) !== "[object Object]")
        throw new Error("params.where is meant to be an object");
      if (Object.keys(params.where).length < 1)
        throw new Error("params.where must have a value");
        
      const column_name: string = params.column_name.join();
      let where: string = "";
      for (let [key, value] of Object.entries(params.where)) {
        where += `${key} = '${value}' AND `;
      }
      if (where.endsWith("AND ")) {
        where = where.slice(0, -4);
      }
      let sql: string;
      if (!limit) {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where};`;
      } else {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where} LIMIT ${limit};`;
      }
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

  GetAll(limit: number | null = null) {
    return new Promise((resolve, reject) => {
      let sql: string;
      if (!limit) {
        sql = `SELECT * FROM ${this.table_name} ;`;
      } else {
        sql = `SELECT * FROM ${this.table_name}  LIMIT ${limit};`;
      }
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
