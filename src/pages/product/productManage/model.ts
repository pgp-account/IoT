import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryRule, removeRule, updateRule, searchProject, getProductInfo } from './service';

import { TableListData, TableListItem } from './data.d';
import { message } from 'antd';

export interface StateType {
  data: TableListItem[];
  searchData: TableListItem[];
  singleInfo:TableListItem[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
    search: Effect;
    fetchInfo: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveSearch:Reducer<StateType>;
    saveInfo:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'productManageList',

  state: {
    data: [],
    searchData:[],
    singleInfo:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(queryRule);
      // console.log(response.data);
      if(response.meta.success){
        const data = response.data;
        // console.log(data.length);
        yield put({
          type: 'save',
          payload: data,
        });
      }else{
        message.info(response.meta.message);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      console.log('response',response);
      if(response.meta.success){
        message.success(response.meta.message);
        yield put({
          type: 'save',
          payload: response.data,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      console.log('response',response);
      if(response.meta.success){
        message.success(response.meta.message);
        yield put({
          type: 'save',
          payload: response.data,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      console.log('response',response);
      if(response.meta.success){
        message.success(response.meta.message);
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchProject, payload);
      console.log('response',response);
      let search = [];
      if(response.meta.success){
        search = response.data;
        yield put({
          type: 'saveSearch',
          payload: search,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *fetchInfo({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getProductInfo, payload);
      // console.log(response.data);
      if(response.meta.success){
        const data = response.data;
        yield put({
          type: 'saveInfo',
          payload: data,
        });
      }else{
        message.info(response.meta.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveSearch(state, action) {
      console.log("action.payload",action.payload);
      return {
        ...state,
        searchData: action.payload,
      };
    },
    saveInfo(state, action) {
      return {
        ...state,
        singleInfo: action.payload,
      };
    },
  },
};

export default Model;
