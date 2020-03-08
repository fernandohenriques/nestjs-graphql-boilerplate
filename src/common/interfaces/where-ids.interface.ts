export interface IWhereIds {
  _id: { $in: string[] };
  active: boolean;
}
