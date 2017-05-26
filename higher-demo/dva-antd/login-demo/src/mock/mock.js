/**
 * Created by chengfan on 2017/5/25*/

const qs = require('qs')
const Mock = require('mockjs')

const userPermission = {
  DEFAULT: [
    'index',
  ],
  ADMIN: [
    'index', 'admin', 'users',
  ],
  USERS: [
    'index', 'users',
  ]
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permission: userPermission.ADMIN
  },
  {
    id: 1,
    username: 'user',
    password: 'user',
    permission: userPermission.USERS
  },
];

module.exports = {
  [`POST /login`] (req, res){
    const { username, password } = req.body
    const user = adminUsers.filter((item) => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'ok' })
    } else {
      res.status(400).end()
    }
  }
}

