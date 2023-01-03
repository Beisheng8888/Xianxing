import {host} from './constant.js';

function request(options) {
  let url = options.url;
    if (!url.startsWith('http')) {
      url = host + url;
    }
    wx.request({
      url: url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {
        'User-Agent-Ext': 'appName=lyxianxing'
      },
      success: res => {
        if (options.success) {
          options.success(res.data);
        }
      },
      fail: err => {
        if (options.fail) {
          options.fail(res);
        }
      }
    });
}
// 暴露给外界
export default request;