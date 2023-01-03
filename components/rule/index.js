//index.js

Component({
  //事件处理函数
  bindShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  methods: {
    previewImg() {
      wx.previewImage({
        current: 'http://www.anqi520.com/upload/2023/01/%E5%9C%B0%E5%9B%BE-c9c4920a39fd4b649df7e52ab4d914f0.jpg', // 当前显示图片的http链接
        urls: ['http://www.anqi520.com/upload/2023/01/%E5%9C%B0%E5%9B%BE-c9c4920a39fd4b649df7e52ab4d914f0.jpg'] // 需要预览的图片http链接列表
      });
    },
  },
  onLoad: function () {
    
  }
})
