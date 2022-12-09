/**
 * @Author: bzirs
 * @Date: 2022-12-08 16:43:01
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 16:43:04
 * @FilePath: /interview-pc/src/api/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 登录接口
export const userLogin = obj => request.post('/auth/login', obj)

// 获取管理员信息
export const getUserInfo = _ => request.get('/auth/currentUser')
