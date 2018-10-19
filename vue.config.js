module.exports = {
  baseUrl: 'ele',
  devServer: {
    proxy: {
      '/v1': {
        //target: 'http://cangdu.org:8001',
        target: 'https://elm.cangdu.org/',
        ws: true,
        changeOrigin: true,
      },
      '/v2': {
        target: 'https://elm.cangdu.org/',
        ws: true,
        changeOrigin: true,
      },
      '/v4': {
        target: 'https://elm.cangdu.org/',
        ws: true,
        changeOrigin: true,
      },
      '/shopping': {
        target: 'https://elm.cangdu.org/',
        ws: true,
        changeOrigin: true,
      },
    },
    // proxy: [{
    //     context: [ // 代理路径
    //         '/shopping',
    //         '/ugc',
    //         '/v1',
    //         '/v2',
    //         '/v3',
    //         '/v4',
    //         '/bos',
    //         '/member',
    //         '/promotion',
    //         '/eus',
    //         '/payapi',
    //         '/img',
    //     ],
    //     target: 'http://cangdu.org:8001',
    //     ws: true,
    //     changeOrigin: true,
    // }],
  },
}
