import { httpService } from '../core';

export function getTableList(params: any) {
  return httpService.get('/table/getTableList', params);
}
