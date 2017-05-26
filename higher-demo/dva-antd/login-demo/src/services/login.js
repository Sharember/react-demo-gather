/**
 * Created by chengfan on 2017/5/25.
 */

import request  from '../utils/request'

export async function login(data) {
  return request( {
    url: '/login',
    method: 'post',
    data,
  })
}
