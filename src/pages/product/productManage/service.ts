import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule() {
  return request('/server/product/getAllProductsInfo', {
    method: 'GET',
  });
}

export async function removeRule(params: TableListParams) {
  console.log(params.productId);
  const api = `${'/server/product/deleteProduct?productId='}${params.productId}`;
  return request(api, {
    method: 'POST',
  });
}

export async function addRule(params: TableListParams) {
  console.log(params);
  return request('/server/product/addProduct', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/server/product/modifyProduct', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchProject(params: TableListParams) {
  const api = `${'/server/product/getProductInfoByKeyword?keyword='}${params.keyword}`;
  return request(api, {
    method: 'POST',
  });
}

export async function getProductInfo(params: TableListParams) {
  console.log("params.productId", params.productId);
  const api = `${'/server/product/getProductInfo?productId='}${params.productId}`;
  return request(api, {
    method: 'POST',
  });
}



