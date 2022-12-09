/**
 * @Author: bzirs
 * @Date: 2022-12-08 16:43:11
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-09 22:26:02
 * @FilePath: /interview-pc/src/api/article.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 获取文章列表
export const getArticleList = obj => request.get('/admin/interview/query', { params: obj })
