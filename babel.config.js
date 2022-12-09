/**
 * @Author: bzirs
 * @Date: 2022-12-08 15:42:59
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 17:08:10
 * @FilePath: /interview-pc/babel.config.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
