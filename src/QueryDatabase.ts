import {
  IDeleteAdvancedParam,
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

  checkString(str: String, msg: string) {
    if (!str) throw new Error(msg + " is not set");
  }

  async Insert(params: any) {
    try {
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

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async InsertMultiple(params: any[]) {
    try {
      let column_name: string | string[] = [];
      let values: any[] = [];

      this.checkArray(params, "param");

      // Extract column names from the first parameter object
      for (let [key] of Object.entries(params[0])) {
        column_name.push(key);
      }
      column_name = column_name.join();

      // Extract and format values for each parameter set
      values = params.map((param) =>
        Object.values(param)
          .map((value: any) => `'${value}'`)
          .join()
      );

      // Generate the SQL query string
      const sql = `INSERT INTO ${
        this.table_name
      } (${column_name}) VALUES ${values.map((value) => `(${value})`).join()}`;

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Get(
    column_name: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    try {
      // Validate input parameters
      this.checkString(column_name, "column_name");
      this.checkString(where, "where");
      this.checkString(value, "value");

      let sql: string;
      if (!limit) {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where}='${value}';`;
      } else {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where}='${value}' LIMIT ${limit};`;
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async GetAdvanced(params: IGetAdvancedParam, limit: number | null = null) {
    try {
      this.checkArray(params.column_names, "params.column_name");

      const column_name: string = params.column_names.join();
      let where: string = "";
      let whereor!: string;
      let whereand!: string;

      if (params.and) {
        for (let [key, value] of Object.entries(params.and)) {
          if (!whereand) whereand = "";
          whereand += `${key} = '${value}' AND `;
        }
        if (whereand.endsWith("AND ")) {
          whereand = whereand.slice(0, -5);
        }

        whereand = "(" + whereand + ")";
      }

      if (params.or) {
        for (let [key, value] of Object.entries(params.or)) {
          if (!whereor) whereor = "";
          whereor += `${key} = '${value}' OR `;
        }
        if (whereor.endsWith("OR ")) {
          whereor = whereor.slice(0, -4);
        }
        whereor = "(" + whereor + ")";
      }

      if (params.joinwith?.toLowerCase() === "and") {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      } else {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      }

      let sql: string;
      if (!limit) {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where};`;
      } else {
        sql = `SELECT ${column_name} FROM ${this.table_name} WHERE ${where} LIMIT ${limit};`;
      }
      if (params.debug) {
        console.log(sql);
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async GetAll(limit: number | null = null) {
    try {
      let sql: string;

      if (!limit) {
        sql = `SELECT * FROM ${this.table_name} ;`;
      } else {
        sql = `SELECT * FROM ${this.table_name} LIMIT ${limit};`;
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Update(
    column_name: string,
    column_value: string,
    where: string,
    value: string,
    limit: number | null = null
  ) {
    try {
      // Check the input parameters
      this.checkString(column_name, "column_name");
      this.checkString(column_value, "column_value");
      this.checkString(where, "where");
      this.checkString(value, "value");

      let sql: string;

      // Build the SQL query based on the provided parameters
      if (!limit) {
        sql = `UPDATE ${this.table_name} SET ${column_name} ='${column_value}' WHERE ${where}='${value}';`;
      } else {
        sql = `UPDATE ${this.table_name} SET ${column_name} ='${column_value}' WHERE ${where}='${value}' LIMIT ${limit};`;
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async UpdateAdvanced(
    params: IUpdateAdvancedParam,
    limit: number | null = null
  ) {
    try {
      this.checkObject(params.update, "params.update");

      let update: string = "";
      let where: string = "";
      let whereor!: string;
      let whereand!: string;

      // Construct the SET clause for update
      for (let [key, value] of Object.entries(params.update)) {
        update += `${key} = '${value}' ,`;
      }

      // Construct the WHERE clause for filtering
      if (params.and) {
        for (let [key, value] of Object.entries(params.and)) {
          if (!whereand) whereand = "";
          whereand += `${key} = '${value}' AND `;
        }
        if (whereand.endsWith("AND ")) {
          whereand = whereand.slice(0, -5);
        }

        whereand = "(" + whereand + ")";
      }

      if (params.or) {
        for (let [key, value] of Object.entries(params.or)) {
          if (!whereor) whereor = "";
          whereor += `${key} = '${value}' OR `;
        }
        if (whereor.endsWith("OR ")) {
          whereor = whereor.slice(0, -4);
        }
        whereor = "(" + whereor + ")";
      }

      if (params.joinwith?.toLowerCase() === "and") {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      } else {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      }

      // Remove trailing commas and 'AND' from clauses
      if (update.endsWith(",")) {
        update = update.slice(0, -1);
      }

      let sql: string;
      if (!limit) {
        sql = `UPDATE  ${this.table_name} SET ${update} WHERE ${where};`;
      } else {
        sql = `UPDATE  ${this.table_name} SET ${update} WHERE ${where} LIMIT ${limit};`;
      }
      if (params.debug) {
        console.log(sql);
      }
      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async UpdateAll(set: any, limit: number | null = null) {
    try {
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

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Delete(
    column_name: string,
    value: string,
    limit: number | null = null
  ) {
    try {
      let sql: string = "";
      if (!limit) {
        sql = `DELETE FROM ${this.table_name} WHERE ${column_name} = ${value};`;
      } else {
        sql = `DELETE FROM ${this.table_name} WHERE ${column_name} = '${value}' LIMIT ${limit};`;
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async DeleteAdvanced(
    params: IDeleteAdvancedParam,
    limit: number | null = null
  ) {
    try {
      let value: string = "";

      let where: string = "";
      let whereor!: string;
      let whereand!: string;

      // Construct the WHERE clause for filtering
      if (params.and) {
        for (let [key, value] of Object.entries(params.and)) {
          if (!whereand) whereand = "";
          whereand += `${key} = '${value}' AND `;
        }
        if (whereand.endsWith("AND ")) {
          whereand = whereand.slice(0, -5);
        }

        whereand = "(" + whereand + ")";
      }
      if (params.or) {
        for (let [key, value] of Object.entries(params.or)) {
          if (!whereor) whereor = "";
          whereor += `${key} = '${value}' OR `;
        }
        if (whereor.endsWith("OR ")) {
          whereor = whereor.slice(0, -4);
        }
        whereor = "(" + whereor + ")";
      }
      if (params.joinwith?.toLowerCase() === "and") {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      } else {
        if (!whereand) {
          where = whereor;
        } else if (!whereor) {
          where = whereand;
        } else {
          where = whereand + " OR " + whereor;
        }
      }

      let sql: string = "";
      if (!limit) {
        sql = `DELETE FROM ${this.table_name} WHERE ${where};`;
      } else {
        sql = `DELETE FROM ${this.table_name} WHERE ${where} LIMIT ${limit};`;
      }

      if (params.debug) {
        console.log(sql);
      }

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);
      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async DeleteAll(table_name: string) {
    try {
      // Check if the table name is the same
      if (table_name !== this.table_name) {
        throw new Error("Table name is not the same");
      }

      // Construct the SQL query
      const sql = `DELETE FROM ${this.table_name};`;

      // Execute the query and wait for the result using `await`
      const [result] = await this.#db.query(sql);

      // Return the query result
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async CustomSQL(sql: string) {
    this.checkString(sql, "sql");
    try {
      const [result] = await this.#db.query(sql);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
