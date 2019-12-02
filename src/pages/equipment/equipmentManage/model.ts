import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { getDeviceByProduct, addEquip, queryRule, removeDevice, editInfo, searchDevice, getProductInfo } from './service';

// import { TableListData, TableListItem } from './data.d';

export interface StateType {
  deviceList: TableListItem[];
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
    add: Effect;
    remove: Effect;
    edit: Effect;
    search: Effect;
    fetchInfoById: Effect;
    getDevice: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveSearch:Reducer<StateType>;
    saveInfo:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'equipmentManageList',

  state: {
    deviceList: [],
    searchData:[],
    singleInfo:[],
  },

  effects: {
    *getDevice({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getDeviceByProduct, payload);
      console.log(response.data);
      const data = response.data;
      if(response.meta.success){
        yield put({
          type: 'save',
          payload: data,
        });
      }else{
        message.info(response.meta.message);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addEquip, payload);
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
      const response = yield call(removeDevice, payload);
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
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(editInfo, payload);
      console.log('response',response);
      if(response.meta.success){
        message.success(response.meta.message);
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchDevice, payload);
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
    *fetchInfoById({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getProductInfo, payload);
      console.log(response.data);
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
        deviceList: action.payload,
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
