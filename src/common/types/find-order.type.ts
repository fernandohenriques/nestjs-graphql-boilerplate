import { order } from './order.type';

export type findOrder = {
  [P in keyof any]?: order;
};
