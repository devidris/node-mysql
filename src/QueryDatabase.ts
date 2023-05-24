import { IGetMultiple, IQueryDatabase } from "./interface/IQueryDatabase";

export class QueryDatabase implements IQueryDatabase {
  #db: any;
  table_name!: string;
  constructor(db: any, table_name: string) {
    this.#db = db;
    this.table_name = table_name;
  }

  checkArray(arr: any[], name: string) {
    if (!arr) throw new Error(name + " is not set");
    if (!Array.isArray(arr)) throw new Error(name + " is meant to be an array");
    if (arr.length < 1) throw new Error(name + " must have a value");
  }

  checkObject(obj: Object, name: string) {
    if (!obj) throw new Error(name + " is not set");
    if (Object.prototype.toString.call(obj) !== "[object Object]")
      throw new Error(name + " is meant to be an object");
    if (Object.keys(obj).length < 1)
      throw new Error(name + " must have a value");
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
      this.checkArray(params.column_name, "params.column_name");
      this.checkObject(params.where, "params.where");

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

  Insert(params: any, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      let column_name: string | string[] = [];
      let value: string | string[] = [];
      for (let [key, val] of Object.entries(params)) {
        column_name.push(key);
        value.push(val as string);
      }
      column_name = column_name.join();
      value = value.map(value=>`'${value}'`).join();

      const sql = `INSERT INTO ${this.table_name} (${column_name}) Values (${value})`;
      console.log(sql);

      const query = this.#db.query(sql, (err: Error, result: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          this.#db.releaseConnection(query);
          resolve(this.GetAll());
        }
      });
    });
  }
}
