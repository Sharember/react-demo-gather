import * as service from '../services/login'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'login',
  state: {
    loginLoading: false
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false
      }
    }
  },
  effects: {
    *login({ payload, }, { call, put }) {

      yield put({
        type: 'showLoginLoading'
      });
      const data = yield call(service.login, payload);

      yield put({
        type: 'hideLoginLoading'
      });
      if (data.success) {
        yield put(routerRedux.push('/index'))
      }
    }
  },
  subscriptions: {},
};
