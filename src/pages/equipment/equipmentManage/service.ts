import request from '@/utils/request';
// import { TableListParams } from './data.d';

export async function queryRule() {
  return request('/server/product/getAllProductsInfo', {
    method: 'GET',
  });
}
export async function getDeviceByProduct(params) {
  console.log(params.productName);
  const api = `${'/server/device/getDeviceByProduct?productName='}${params.productName}`;
  return request(api, {
    method: 'POST',
  });
}


export async function addEquip(params) {
  console.log(params);
  const api = `/server/device/addDevice?createTime=${params.createTime}&deviceName=${params.deviceName}&fkProductId=${params.fkProductId }&getwayId=${params.getwayId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function searchDevice(params) {
  console.log(params.keyWord);
  const api = `${'/server/device/getDeviceByKeyWord?keyWord='}${params.keyWord}`;
  return request(api, {
    method: 'POST',
  });
}

export async function getProductInfo(params) {
  console.log(params.deviceId);
  const api = `${'/server/device/getDeviceInfo?deviceId='}${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function removeDevice(params) {
  console.log(params.deviceId);
  const api = `${'/server/device/deleteDevice?deviceId='}${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function editInfo(params){
  return request('/server/device/modifyDevice', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
