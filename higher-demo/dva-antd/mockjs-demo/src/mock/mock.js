/**
 * Created by chengfan on 2017/5/25.
 */
const Mock = require('mockjs');

const data = Mock.mock({
  'users|10-20': [
    {
      name: '@name',
      'age|1-100': 100,
      color: '@color',
    },
  ],
});

const database = data.users;

module.exports = {
  [`GET /users`](req, res) {
    res.status(200).json(database);
  },
};
