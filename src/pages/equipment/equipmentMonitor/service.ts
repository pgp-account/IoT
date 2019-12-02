import request from '@/utils/request';

export async function getDevice(params) {
  return request('/server/device/getAllDeviceAndProductInfo', {
    method: 'GET',
  });
}

export async function getDeviceReflection(params) {
  console.log(params.deviceId);
  const api = `${'/server/device/deviceReflection?deviceId='}${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function getDeviceHistory(params) {
  console.log(params.deviceId);
  const api = `${'/server/device/getOneDeviceAllData?deviceId='}${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function startGetData(params) {
  console.log(params.deviceId);
  const api = `/server/device/startGetData?deviceId=${params.deviceId}&startTime=${params.startTime}`;
  return request(api, {
    method: 'POST',
  });
}

export async function stopGetCollect(params) {
  console.log(params.deviceId);
  const api = `${'/server/device/getData?deviceId='}${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function getRecentData(params) {
  console.log(params.deviceId);
  const api = `/server/device/getRecentData?deviceId=${params.deviceId}`;
  return request(api, {
    method: 'POST',
  });
}



