import {
  IGetAdvancedParam,
  IQueryDatabase,
  IUpdateAdvancedParam,
} from "./interface/IQueryDatabase";

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

  checkString(str: String) {
    if (!str) throw new Error(str + " is not set");
  }
  Get(
    column_name: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    return new Promise((resolve, reject) => {
      this.checkString(column_name);
      this.checkString(where);
      this.checkString(value);
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

  GetAdvanced(params: IGetAdvancedParam, limit: number | null = null) {
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

  Insert(params: any) {
    return new Promise((resolve, reject) => {
      let column_name: string | string[] = [];
      let value: string | string[] = [];

      this.checkObject(params, "param");

      for (let [key, val] of Object.entries(params)) {
        column_name.push(key);
        value.push(val as string);
      }
      column_name = column_name.join();
      value = value.map((value) => `'${value}'`).join();

      const sql = `INSERT INTO ${this.table_name} (${column_name}) VALUES (${value})`;
      console.log(sql);

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

  InsertMultiple(params: any[]) {
    return new Promise((resolve, reject) => {
      let column_name: string | string[] = [];
      let value: any = [];

      this.checkArray(params, "param");

      for (let [key, val] of Object.entries(params[0])) {
        column_name.push(key);
      }

      params.forEach((param, i: number) => {
        for (let [key, val] of Object.entries(param)) {
          if (value[i]) value[i].push(val);
          if (!value[i]) value[i] = [val];
        }
      });
      column_name = column_name.join();

      value = value
        .map((value: string[]) => {
          return value.map((value) => `'${value}'`).join();
        })
        .map((value: string) => {
          return "(" + value + ")";
        })
        .join();
      const sql = `INSERT INTO ${this.table_name} (${column_name}) VALUES ${value}`;

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

  Update(
    column_name: string,
    column_value: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    return new Promise((resolve, reject) => {
      let sql: string;
      this.checkString(column_name);
      this.checkString(column_value);
      this.checkString(where);
      this.checkString(value);

      if (!limit) {
        sql = `UPDATE ${this.table_name} SET ${column_name} ='${column_value}' WHERE ${where}='${value}';`;
      } else {
        sql = `UPDATE ${this.table_name} SET ${column_name} ='${column_value}' WHERE ${where}='${value}' LIMIT ${limit};`;
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

  UpdateAdvanced(params: IUpdateAdvancedParam, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      this.checkObject(params.update, "params.update");
      this.checkObject(params.where, "params.where");

      let update: string = "";
      let where: string = "";
      for (let [key, value] of Object.entries(params.update)) {
        update += `${key} = '${value}' ,`;
      }
      for (let [key, value] of Object.entries(params.where)) {
        where += `${key} = '${value}' AND `;
      }

      if (update.endsWith(",")) {
        update = update.slice(0, -1);
      }

      if (where.endsWith("AND ")) {
        where = where.slice(0, -4);
      }
      let sql: string;
      if (!limit) {
        sql = `UPDATE  ${this.table_name} SET ${update} WHERE ${where};`;
      } else {
        sql = `UPDATE  ${this.table_name} SET ${update} WHERE ${where} LIMIT ${limit};`;
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
