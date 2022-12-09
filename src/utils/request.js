/**
 * @Author: bzirs
 * @Date: 2022-12-08 16:38:12
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 21:15:01
 * @FilePath: /interview-pc/src/utils/request.js
 * @Description: axios 实例化接口
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import axios from 'axios'
// 导入vuex
import store from '@/store'
// 导入删除token
import { delToken, getToken } from './storage'
// 导入路由
import router from '@/router'
// 导入message
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断vuex和本地是否存在token
  const token = store.state.user.token || getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  Message.error(error.response.data.message)
  if (error.response.status === 401) {
    delToken()
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
