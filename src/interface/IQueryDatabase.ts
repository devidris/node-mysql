export interface IGetAdvancedParam {
  column_name: string[];
  where: any;
}

export interface IUpdateAdvancedParam {
  update: any;
  where: any;
}

export interface IQueryDatabase {
  Get(column_name: string, where: string, value: string, limit: number|null): any;

  GetAdvanced(params: IGetAdvancedParam,limit:number|null): any;

  GetAll(limit:number|null):any

  Insert(params:any,limit:number|null):any

  Insert(params:any):any

  InsertMultiple(params:any[]):any

  Update(column_name: string,column_value: string, where: string, value: string, limit: number|null): any;

  UpdateAdvanced(params: IUpdateAdvancedParam,limit:number|null): any;
}
