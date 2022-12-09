/**
 * @Author: bzirs
 * @Date: 2022-12-08 16:42:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 16:49:57
 * @FilePath: /interview-pc/src/utils/storage.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

const TOKEN = 'interview-pc-token'

// 设置token
export const setToken = key => localStorage.setItem(TOKEN, key)

// 获取token
export const getToken = _ => localStorage.getItem(TOKEN)

// 删除token
export const delToken = _ => localStorage.removeItem(TOKEN)
