//logs.js
import {calendarUtil} from '../../utils/calendar.js';
import {xianxingUtil} from '../../utils/xianxing.js';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const currentWeek = date.getDay();
const currentHours = date.getHours();
let todayData = {};

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,

    week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthList: {
      // '2020-11': [
      //   {
      //     // 公历
      //     solarDay: 1,
      //     // 农历
      //     lunarDay: '初一',
      //     holiday: true,
      //     today: false
      //   }
      // ]
    },
    swiperRowCount: 5,
    activeIndex: 0,
    initSuffixNo: null,
    suffixNo: null,
    currentDate: null,
    xianxingTips: '',
    currentXianxing: '',

    selectedMonth: currentMonth + 1
  },
  onChooseAvatar(e) {
    console.log(e.detail.avatarUrl)
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  tapNotice() {
    wx.switchTab({
      url: '/pages/summary/summary',
    })
  },
  changeSwiper(event) {
    const key = event.detail.currentItemId;
    const yearMonth = key.split('-');
    this.setTitle(parseInt(yearMonth[0]), parseInt(yearMonth[1]));
    this.setData({
      swiperRowCount: parseInt(yearMonth[2]),
      selectedMonth: parseInt(yearMonth[1]) + 1
    });
  },
  onPrev() {
    if (this.data.activeIndex > 0) {
      this.setData({
        activeIndex: this.data.activeIndex - 1
      });
    }
  },
  onNext() {
    if (this.data.activeIndex < Object.keys(this.data.monthList).length) {
      this.setData({
        activeIndex: this.data.activeIndex + 1
      });
    }
  },
  changeSuffixNo(event) {
    const value = event.detail.value;
    if (value != null && value != '') {
      wx.setStorageSync('suffixNo', value);
      this.initCalendar();
    }
    this.setXianxingTips();
  },
  edit() {
    this.setData({
      suffixNo: null
    });
  },
  initCalendar() {
    wx.showLoading({
      title: '加载中'
    });

    // 从storage读取尾号
    // wx.setStorageSync('suffixNo', 'value')
    const suffixNo = wx.getStorageSync('suffixNo');
    if (suffixNo) {
      this.setData({
        suffixNo: parseInt(suffixNo)
      });
    }
    this.setXianxingTips();

    // 设置标题
    this.setTitle(currentYear, currentMonth);

    const monthList = {};
    // 2年的数据
    for (let i = 0; i < 2; i++) {
      // 12个月
      for (let j = 0; j < 12; j++) {
        const year = currentYear + i;
        const month = j;

        // 默认在本月
        if (year == currentYear && month == currentMonth) {
          this.setData({
            activeIndex: 12 * i + j
          });
        }

        const days = calendarUtil.getMonthDay(year, month);
        const day = days.map((item, index) => {
          if (item == null) {
            return null;
          }
          const xianxingInfo = xianxingUtil.getXianxingInfo(year, month, item, index % 7, suffixNo);
          const today = currentYear == year && currentMonth == month && currentDate == item;
          const result = {
            year: year,
            month: month,
            day: item,
            xianxing: xianxingInfo[0],
            xianxingInfo: xianxingInfo[1],
            myselfXianxing: true,
            today: today
          };

          if (today) {
            todayData = result;
          }
          
          return result;
        });
        monthList[year + '-' + month + '-' + (parseInt(day.length / 7) + 1)] = day;
      }
    }
    this.setData({
      monthList: monthList
    });
    wx.hideLoading();
  },
  setXianxingTips() {
    let tips = '';
    const xianxingInfo = xianxingUtil.getXianxingInfo(currentYear, currentMonth, currentDate, currentWeek, this.data.suffixNo);
    if (!xianxingInfo[0]) {
      tips = '您今日不限行，请放心行驶😀';
    } else if(currentHours >= 19) {
      tips = '现在不限行，请放心行驶😀';
    } else if(currentHours < 8) {
      tips = '8:00后开始限行，请不要驶入限行区域😀';
    } else {
      if (this.data.suffixNo == null) {
        tips = '今日' + xianxingInfo[1] + '尾号的车辆，请不要驶入限行区域😂';
      } else {
        tips = '您今日限行，请不要驶入限行区域😂';
      }
    }
    this.setData({
      xianxingTips: tips,
      currentXianxing: xianxingInfo[1] == '不限行' ? '' : xianxingInfo[1]
    });
  },
  setTitle(year, month) {
    wx.setNavigationBarTitle({
      title: [year, '年', (month + 1), '月邯郸限行'].join('')
    })
  },
  onLoad: function (option) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    }),
    this.setData({
      currentDate: {
        year: currentYear,
        month: currentMonth,
        day: currentDate
      }
    });
    this.initCalendar();
    if (option.type == 'news') {
      const id = option.id;
      wx.navigateTo({
        url: '/pages/newsdetail/index?id=' + id,
      });
    }
  },
  onShareAppMessage: function( options ){
    return {
      title: '今日' + todayData.xianxingInfo + '，邯郸期间限行有变化👉',
      imageUrl: '../../images/share.jpg'
    };
  },
  onShareTimeline: function () {
		return {
        title: '今日' + todayData.xianxingInfo + '，邯郸期间限行有变化👉',
        imageUrl: '../../images/share.jpg'
	    }
	}
})
