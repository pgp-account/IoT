import request from '@/utils/request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request(`/server/user/userRegister?password=${params.password}&userName=${params.userName}`, {
    method: 'POST',
  });
}
