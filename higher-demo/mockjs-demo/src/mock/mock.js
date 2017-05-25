/**
 * Created by chengfan on 2017/5/25.
 */
const Mock = require('mockjs');

const users = Mock.mock({
  'user|10-20': [
    {
      name: '@name',
      'age|1-100': 100,
      color: '@color',
    },
  ],
});

const database = users.user;

module.exports = {
  [`GET /data`](req, res) {
    res.status(200).json(database);
  },
};
