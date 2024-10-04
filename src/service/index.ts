import { httpService } from './core/index';

interface LoginParams {
  username: string;
  password: string;
}

export const loginApi = (data: LoginParams) => {
  return httpService.post('/login', data);
};

export const getUserInfo = () => {
  return httpService.get('/getUserInfo');
};

export const logoutApi = () => {
  return httpService.get('/logout');
};
