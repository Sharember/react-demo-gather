/**
 * Created by chengfan on 2017/5/25.
 */

import request  from '../utils/request'

export async function login(data) {
  console.log("124")
  return request('/login', {
    method: 'post',
    data,
  })
}
