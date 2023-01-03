//app.js

Page({
  data: {
    apps: []
  },
  onTapApp(event) {
    var appId = event.currentTarget.dataset.app;
    wx.navigateToMiniProgram({
      appId: appId,
    });
  },
  getApps() {
    wx.request({
      method: 'GET',
      url: 'https://api.xingzou.art/poetryapi/app/list',
      data: {
        channel: 30,
        appId: 'wx42d715c522632f72'
      },
      success: (res) => {
        const data = res.data;
        if (data.success) {
          this.setData({
            apps: data.result
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          });
        }
      },
      fail: (res) => {
      }
    });
  },
  onLoad: function () {
    this.getApps();
  },
  onShareAppMessage: function( options ){
    return {
      title: '送你一份洛阳限行指南',
      imageUrl: '../../images/fanwei.jpg'
    };
  },
  onShareTimeline: function () {
		return {
        title: '送你一份洛阳限行指南',
        imageUrl: '../../images/fanwei.jpg'
	    }
	}
})
