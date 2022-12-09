/**
 * @Author: bzirs
 * @Date: 2022-12-08 20:08:24
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-09 08:41:10
 * @FilePath: /interview-pc/src/store/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import { setToken, getToken, delToken } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    // 先获取本地token 没有的时候给个空字符串
    token: getToken() || ''
  }),
  mutations: {
    setToken (state, payload) {
      state.token = payload
      // 同步存储localstorage
      setToken(payload)
    },
    removeToken (state, payload) {
      state.token = ''
      delToken()
    }
  }
}
