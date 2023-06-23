export interface IGetAdvancedParam {
  column_names: string[];
  and?: any;
  or?: any;
  joinwith?: "OR" | "or" | "and" | "AND";
  debug?: boolean;
}

export interface IUpdateAdvancedParam {
  update: any;
  and?: any;
  or?: any;
  joinwith?: "OR" | "or" | "and" | "AND";
  debug?: boolean;
}

export interface IDeleteAdvancedParam {
  and?: any;
  or?: any;
  joinwith?: "OR" | "or" | "and" | "AND";
  debug?: boolean;
}


export interface IQueryDatabase {
  Get(
    column_name: string,
    where: string,
    value: string,
    limit: number | null
  ): any;

  GetAdvanced(params: IGetAdvancedParam, limit: number | null): any;

  GetAll(limit: number | null): any;

  Insert(params: any, limit: number | null): any;

  Insert(params: any): any;

  InsertMultiple(params: any[]): any;

  Update(
    column_name: string,
    column_value: string,
    where: string,
    value: string,
    limit: number | null
  ): any;

  UpdateAdvanced(params: IUpdateAdvancedParam, limit: number | null): any;

  UpdateAll(set: any, limit: number | null): any;

  Delete(column_name: string, value: string, limit: number | null): any;

  DeleteAdvanced(params:IDeleteAdvancedParam, limit: number | null): any;

  DeleteAll(table_name: string): any;

  CustomSQL(sql: string): any;
}
