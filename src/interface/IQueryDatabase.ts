export interface IGetMultiple {
  column_name: string[];
  where: any;
}

export interface IQueryDatabase {
  Get(column_name: string, where: string, value: string, limit: number|null): any;

  GetAdvanced(params: IGetMultiple,limit:number|null): any;

  GetAll(limit:number|null):any
}
