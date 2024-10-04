import { httpService } from '@/utils/axios';

interface LoginParams {
  username: string;
  password: string;
}

export function loginApi(data: LoginParams): Promise<any> {
  return httpService({
    url: '/login',
    method: 'post',
    data,
  });
}

export function getUserInfo(): Promise<any> {
  return httpService.get('/getUserInfo');
}

export function logoutApi() {
  return httpService({
    url: '/logout',
    method: 'get',
  });
}

export function getTableList(params: any) {
  return httpService({
    url: '/table/getTableList',
    method: 'get',
    params,
  });
}
