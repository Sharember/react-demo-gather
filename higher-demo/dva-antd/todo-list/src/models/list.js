export default {
  namespace: 'lists',
  state: [],
  reducers: {
    add(state, { payload: name }) {
      let id = state.reduce(
        (previous, current) => (previous.id > current.id ? previous : current),
      ).id;
      id += 1;
      return [...state, { name, id }];
    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
