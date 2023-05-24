export interface iQueryDatabase {
  Get(
    column_name: string,
    where: string,
    value: string,
    limit: number
  ): any;
}
