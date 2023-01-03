//index.js
const app = getApp()

Page({
  data: {
    id: '',
    detail: {}
  },
  //事件处理函数
  onLoad: function (option) {
    this.data.id = option.id;
    this.get();
  },
  get() {
    wx.showLoading({
      title: '加载中'
    });
    app.request({
      url: '/poetryapi/news/get',
      data: {
        id: this.data.id
      },
      success: (res) => {
        const result = res.result || [];
        this.setData({
          detail: result
        });
        wx.hideLoading();
      },
      fail: (e) => {
        wx.hideLoading();
      }
    });
  },
  onShareAppMessage: function( options ){
    const detail = this.data.detail;
    return {
      title: detail.title,
      imageUrl: detail.coverUrl,
      path: '/pages/index/index?type=news&id=' + detail.id
    };
  },
  onShareTimeline: function () {
    const detail = this.data.detail;
		return {
        title: detail.title,
        imageUrl: detail.coverUrl,
        query: 'type=news&id=' + detail.id
	    }
	}
})
