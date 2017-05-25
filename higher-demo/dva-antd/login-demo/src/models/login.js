import login from '../services/login'
import routerResux from 'dva/router'

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
    *login({ payload, }, { put, call }) {

      yield put({
        type: 'showLoginLoading'
      });
      const data = yield call(login, payload);

      yield put({
        type: 'hideLoginLoading'
      });
      if (data.success) {
        yield put(routerResux.push('users'))
      }
    }
  },
  subscriptions: {},
};
