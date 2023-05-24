import {
  IGetAdvancedParam,
  IQueryDatabase,
  IUpdateAdvancedParam,
} from "./interface/IQueryDatabase";

interface ICreateTable {
  name: string;
  rows: any;
}
export class QueryDatabase implements IQueryDatabase {
  #db: any;
  table_name!: string;
  constructor(
    db: any,
    table_name: string,
    create_table: boolean | ICreateTable = false
  ) {
    this.#db = db;
    this.table_name = table_name;
    if (create_table) {
      this.checkObject(create_table, "create_table");
      let rows = "";
      for (let [key, value] of Object.entries(
        (create_table as ICreateTable).rows
      )) {
        rows += key + " " + value + ",";
      }
      if (rows.endsWith(",")) {
        rows = rows.slice(0, -1);
      }
      const sql = `CREATE TABLE ${
        (create_table as ICreateTable).name
      } (${rows})`;
      console.log(sql);
      const query = this.#db.query(sql, (err: Error, result: any) => {
        if (err) {
          console.error(err);
        } else {
          this.#db.releaseConnection(query);
          console.log(result);
        }
      });
    }
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

  checkString(str: String, msg: string) {
    if (!str) throw new Error(msg + " is not set");
  }
  Get(
    column_name: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    return new Promise((resolve, reject) => {
      this.checkString(column_name, "column_name");
      this.checkString(where, "where");
      this.checkString(value, "value");
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
      this.checkString(column_name, "column_name");
      this.checkString(column_value, "column_value");
      this.checkString(where, "where");
      this.checkString(value, "value");

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

  UpdateAll(set: any, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      this.checkObject(set, "set");
      let update: string = "";
      for (let [key, value] of Object.entries(set)) {
        update += `${key} = '${value}' ,`;
      }

      if (update.endsWith(",")) {
        update = update.slice(0, -1);
      }
      let sql: string;
      if (!limit) {
        sql = `UPDATE ${this.table_name} SET ${update} ;`;
      } else {
        sql = `UPDATE ${this.table_name} SET ${update}  LIMIT ${limit};`;
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

  Delete(column_name: string, value: string, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      let sql: string = "";
      if (!limit) {
        sql = `DELETE FROM ${this.table_name} WHERE ${column_name} = ${value};`;
      } else {
        sql = `DELETE FROM ${this.table_name} WHERE ${column_name} = '${value}' LIMIT ${limit};`;
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

  DeleteAdvanced(where: any, limit: number | null = null) {
    return new Promise((resolve, reject) => {
      let value: string = "";

      this.checkObject(where, "param");

      for (let [key, val] of Object.entries(where)) {
        value += `${key} = '${val}' AND `;
      }
      if (value.endsWith("AND ")) {
        value = value.slice(0, -4);
      }
      let sql: string = "";
      if (!limit) {
        sql = `DELETE FROM ${this.table_name} WHERE ${value};`;
      } else {
        sql = `DELETE FROM ${this.table_name} WHERE ${value} LIMIT ${limit};`;
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

  DeleteAll(table_name: string) {
    return new Promise((resolve, reject) => {
      if (table_name !== this.table_name)
        throw new Error("Table name is not the same");
      let sql = `DELETE FROM ${this.table_name} ;`;
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

  CustomSQL(sql: string) {
    return new Promise((resolve, reject) => {
      this.checkString(sql, "sql");
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
