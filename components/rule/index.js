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
        current: 'https://api.xingzou.art/download/fanwei.jpg', // 当前显示图片的http链接
        urls: ['https://api.xingzou.art/download/fanwei.jpg'] // 需要预览的图片http链接列表
      });
    },
  },
  onLoad: function () {
    
  }
})
