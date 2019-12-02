import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getDevice, getDeviceReflection, getDeviceHistory, startGetData, stopGetCollect, getRecentData } from './service';
import { message } from 'antd';

export interface StateType {
  receptData: object;
  reflection: object;
  collectData:[];
  recentData:[];
  deviceList:[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getDeviceList:Effect;
    getReflection: Effect;
    getHistory: Effect;
    startData: Effect;
    stopCollect: Effect;
    recentData: Effect;
    init:Effect;
    initRecentData:Effect;
  };
  reducers: {
    save:any;
    saveDevice:any;
    saveReflection:any;
    saveGet:any;
    saveRecent:any;
    initState:any;
    initRecent:any;
  };
}

const Model: ModelType = {
  namespace: 'equipmentMonitorList',

  state: {
    deviceList:[],
    receptData: [],
    reflection:{},
    collectData:[],
    recentData:[]
  },

  effects: {
    *getDeviceList({ payload }, { call, put }) {
      const response = yield call(getDevice, payload);
      console.log(response.data);
      if(response.meta.success){
        const data = response.data;
        yield put({
          type: 'saveDevice',
          payload: data,
        });
      }else{
        message.info(response.meta.message);
      }
    },
    *getReflection({ payload }, { call, put }) {
      const response = yield call(getDeviceReflection, payload);
      console.log(response.data);
      if(response.meta.success){
        const data = response.data;
        yield put({
          type: 'saveReflection',
          payload: data,
        });
      }else{
        message.info(response.meta.message);
      }
    },
    *getHistory({ payload, callback }, { call, put }) {
      const response = yield call(getDeviceHistory, payload);
      console.log('response',response);
      if(response.meta.success){
        yield put({
          type: 'save',
          payload: response.data,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *startData({ payload, callback }, { call, put }) {
      const response = yield call(startGetData, payload);
      console.log('response',response);
      if(response.meta.success){
        // message.success(response.meta.message);
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *stopCollect({ payload, callback }, { call, put }) {
      console.log('payload',payload);
      const response = yield call(stopGetCollect, payload);
      console.log('response',response);
      let search = [];
      if(response.meta.success){
        search = response.data;
        yield put({
          type: 'saveGet',
          payload: search,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *recentData({ payload, callback }, { call, put }) {
      const response = yield call(getRecentData, payload);
      console.log('response',response);
      let search = {};
      if(response.meta.success){
        search = response.data;
        yield put({
          type: 'saveRecent',
          payload: search,
        });
        if (callback) callback();
      }else{
        message.info(response.meta.message);
      }
    },
    *init({ payload }, { call, put }){
      yield put({
        type: 'initState',
      });
    },
    *initRecentData({ payload }, { call, put }){
      yield put({
        type: 'initRecent',
      });
    },

  },

  reducers: {
    saveDevice(state, action) {
      console.log("action.payload",action.payload);
      return {
        ...state,
        deviceList: action.payload,
      };
    },
    saveReflection(state, action) {
      console.log("action.payload",action.payload);
      return {
        ...state,
        reflection: action.payload,
      };
    },
    save(state, action) {
      console.log("action.payload",action.payload);
      return {
        ...state,
        receptData: action.payload,
      };
    },
    saveGet(state, action) {
      return {
        ...state,
        collectData: action.payload,
      };
    },
    saveRecent(state, action) {
      const recentData = state.recentData;
      console.log('recentData', recentData);
      return {
        ...state,
        recentData: [...recentData, action.payload],
      };
    },
    initState(state, action){
      return {
        ...state,
        receptData: [],
        reflection:{},
        collectData:[],
        recentData:[]
      };
    },
    initRecent(state, action){
      return {
        ...state,
        recentData:[]
      };
    },
  },
};

export default Model;
