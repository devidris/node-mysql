export interface IGetMultiple {
  column_name: string[];
  where: any;
}

export interface IQueryDatabase {
  Get(column_name: string, where: string, value: string, limit: number): any;

  GetAdvanced(params: IGetMultiple,limit:number): any;
}
