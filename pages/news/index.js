//index.js
const app = getApp()

Page({
  data: {
    list: []
  },
  //事件处理函数
  tapNews(event) {
    const id = event.currentTarget.dataset.id;
    const index = event.currentTarget.dataset.index;
    const news = this.data.list[index];
    const shortContent = news.shortContent;
    if (shortContent && shortContent.startsWith('{')) {
      try {
        const json = JSON.parse(shortContent);

        // 记录点击次数
        app.request({
          url: '/poetryapi/news/get',
          data: {
            id: id
          },
        });

        wx.navigateToMiniProgram(json);
        return;
      } catch(e) {
        console.log(e);
      }
    }

    wx.navigateTo({
      url: '/pages/newsdetail/index?id=' + id,
    });
  },
  onLoad: function () {
    this.query();
  },
  query() {
    wx.showLoading({
      title: '加载中'
    });
    app.request({
      url: '/poetryapi/news/query',
      success: (res) => {
        const result = res.result || [];
        this.setData({
          list: result
        });
        wx.hideLoading();
      },
      fail: (e) => {
        wx.hideLoading();
      }
    });
  },
  onShareAppMessage: function( options ){
    return {
      title: '送你一份洛阳限行指南',
      imageUrl: '../../images/fanwei.jpg',
      path: '/pages/index/index'
    };
  },
  onShareTimeline: function () {
		return {
        title: '送你一份洛阳限行指南',
        imageUrl: '../../images/fanwei.jpg'
	    }
	}
})
