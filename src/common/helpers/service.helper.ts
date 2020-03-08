import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IWhereName } from '../interfaces/where-name.interface';
import { IWhereIds } from '../interfaces/where-ids.interface';
import { findOrder } from '../types/find-order.type';
import { FindNameDto } from '../dto/find-name.dto';

@Injectable()
export class ServiceHelper {
  async getUpsertData(
    id: string | undefined,
    fields: any,
    repository: Repository<any>,
  ): Promise<any> {
    if (id) {
      return {
        ...(await repository.findOne(id)),
        ...fields,
      };
    }

    return repository.create(fields);
  }

  getWhereByName(name: string | undefined): IWhereName {
    const $where: IWhereName = {
      active: true,
    };

    if (name) {
      $where.name = new RegExp('.*' + name.toLocaleLowerCase() + '.*', 'i');
    }

    return $where;
  }

  getWhereByIds(ids: string[]): IWhereIds {
    const $where: IWhereIds = {
      _id: { $in: ids.map((mongoId: string): string => ObjectId(mongoId)) },
      active: true,
    };

    return $where;
  }

  async findAllByNameOrIds(
    dto: FindNameDto,
    repository: Repository<any>,
  ): Promise<any> {
    const { skip, take, ids, name, order, fieldSort }: FindNameDto = dto;
    const $order: findOrder = { [fieldSort]: order };
    const $where: IWhereName | IWhereIds = ids
      ? this.getWhereByIds(ids)
      : this.getWhereByName(name);

    const [result, count]: [any[], any[]] = await Promise.all([
      repository.find({
        skip,
        take,
        where: $where,
        order: $order,
      }),
      repository.find({
        where: $where,
      }),
    ]);

    return {
      items: result,
      total: count.length,
    };
  }
}
