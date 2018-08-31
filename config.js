/*
  * pageConfig: 配置入口文件和html-webpack-plugin
  * @param 每一项     类型      描述
  * @param entryName String   该模块（页面）入口文件名称
  * @param entryPath String   该模块（页面）入口文件的路径
  * @param filename  String   打包后的html文件名
  * @param template  String   该文件的html模板
  * @param chunks    Array    一般第一个为该文件的enterName，如果用到第三方库（比如jquery）则第二个为'common'
* */

exports.config = {
  publicPath: '/',
  devServer: {
    host: 'localhost',
    port: 8080 // 端口
  },
  pageConfig: [
    {
      entryName: "index",
      entryPath: "./src/index.main.js",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ['index', 'common']
    }
  ],
  proxy: [
    {
      target: 'https://www.bilibili.com',
      path: '/index/recommend.json'
    }
  ]
};
