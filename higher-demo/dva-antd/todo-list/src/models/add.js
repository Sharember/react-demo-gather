/**
 * Created by chengfan on 2017/5/24.
 */
export default {
  namespace: 'inputs',
  state: {
    input: 'name',
  },
  reducers: {
    change(state, { payload: name }) {
      return { input: name };
    },
  },
};
