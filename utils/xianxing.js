import {calendarUtil} from './calendar.js';

export var xianxingUtil = {
  holidays: [

    '20230101',
    '20230102',
    '20230103',
    '20230104',
    '20230105',
    '20230106',
    '20230107',
    '20230108',
    '20230109',
    '20230110',
    '20230111',
    '20230112',
    '20230113',
    '20230114',
    '20230115',
    '20230116',
    '20230117',
    '20230118',
    '20230119',
    '20230120',
    '20230121',
    '20230122',
    '20230123',
    '20230124',
  ],

  // 是不是假期
  isHoliday: function(year, month, day) {
    return this.holidays.indexOf(
        `${year}${(month + 1).toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`) >= 0;
  },

  // 统计指定年月假期余额，返回数组，[指定年月总假期, 剩余假期]
  getMonthBalance(year, month, day) {
    // 指定年月总假期
    const monthHoliday = this.holidays.filter(item => item.startsWith(`${year}${(month + 1).toString().padStart(2, '0')}`));
    // 剩余假期
    const balanceHoliday = monthHoliday.filter(item => {
      const itemDay = item.replace(`${year}${(month + 1).toString().padStart(2, '0')}`, '');
      // 不包括今天
      return parseInt(itemDay) > day;
    });
    return [monthHoliday.length, balanceHoliday.length];
  },

    // 统计指定年假期余额，返回数组，[指定年总假期, 剩余假期]
    getYearBalance(year, month, day) {
      // 指定年总假期
      const yearHoliday = this.holidays.filter(item => item.startsWith(`${year}`));
      // 剩余假期
      const balanceHoliday = yearHoliday.filter(item => {
        const itemMonthDay = item.replace(`${year}`, '');
        const itemMonth = itemMonthDay.substr(0, 2);
        const itemDay = itemMonthDay.substr(2, 2);
        // 不包括今天
        return parseInt(itemMonth) > month && parseInt(itemDay) > day;
      });
      return [yearHoliday.length, balanceHoliday.length];
    },

    // 统计指定年月工作日余额，返回数组，[指定年月总工作日, 剩余工作日]
    getMonthWorkBalance(year, month, day) {
      // 获取指定月总天数
      const totleDay = calendarUtil.getTotalDayByMonth(year, month);
      const monthBalance = this.getMonthBalance(year, month, day);
      // 指定月总工作日
      const totleWork = totleDay - monthBalance[0];
      // 剩余总天数
      const dayBalance = totleDay - day;
      // 剩余的总工作日
      const workBalance = dayBalance - monthBalance[1];
      return [totleWork, workBalance];
    },
  
    // 统计指定年工作日余额，返回数组，[指定年总工作日, 剩余工作日]
    getYearWorkBalance(year, month, day) {
      // 获取指定年总天数
      const totleDay = calendarUtil.getTotalDayByYear(year);
      const yearBalance = this.getYearBalance(year, month, day);
      // 指定年总工作日
      const totleWork = totleDay - yearBalance[0];
      // 剩余总天数
      const aleryDay = (new Date(`${year}-${month + 1}-${day}`) - new Date(`${year}-01-01`)) / (24 * 3600 * 1000) + 1;
      const dayBalance = totleDay - aleryDay;
      // 剩余的总工作日
      const workBalance = dayBalance - yearBalance[1];
      return [totleWork, workBalance];
    },

    // 获取每个月的假期数
    getEveryMonthHoliday(year) {
      const monthHoliday = [];
      this.holidays.forEach(item => {
        const itemYear = parseInt(item.substr(0, 4));
        if (year == itemYear) {
          const month = parseInt(item.substr(4, 2));
          let holiday = monthHoliday[month - 1] || 0;
          holiday++;
          monthHoliday[month - 1] = holiday;
        }
      });
      return monthHoliday;
    },

    // 计算距离下个假期的天数
    getNextHolidayInterval(year, month, day) {
      for (const index in this.holidays) {
        const item = this.holidays[index];
        const itemYear = parseInt(item.substr(0, 4));
        if (itemYear >= year) {
          const itemMonth = parseInt(item.substr(4, 2));
          if (itemMonth > month) {
            const itemDay = parseInt(item.substr(6, 2));
            if (itemDay >= day) {
              return (new Date(`${itemYear}-${itemMonth}-${itemDay}`) - new Date(`${year}-${month + 1}-${day}`)) / (24 * 3600 * 1000);
            }
          }
        }
      }
    },

    // 计算某天是否限行
    getXianxingInfo(year, month, day, date, suffixNo) {
      // 单双号限行特殊处理
     /* if (year == 2020 && month == 11 && day >= 7) {
        // 如果绑定车牌号，则判断车牌号和日期是否都是奇数或者都是偶数；如果没有绑定车牌号，则返回限行信息
        return [
          suffixNo == null ? true : suffixNo % 2 != day % 2,
          day % 2 == 0 ? '限单号' : '限双号'
        ]
      }*/

      // 单双号限行特殊处理，牡丹花会期间
      /*if (year == 2021) {
        if (month == 3) {
          // 3, 4, 10, 11, 17, 18, 24, 25
          if ([3, 4, 10, 11, 17, 18, 24, 25].indexOf(day) >= 0) {
            return [
              suffixNo == null || suffixNo == '' ? true : suffixNo % 2 != day % 2,
              day % 2 == 0 ? '限单号' : '限双号'
            ]
          } else {
            return [
              suffixNo == null || suffixNo == '' ? true : suffixNo == date || suffixNo + 5 == date || suffixNo - 5 == date,
              ['限', date, '和', (date + 5) % 10].join('')
            ];
          }
        } else if (month == 4) {
          // 1, 2, 8, 9
          if ([1, 2, 8, 9].indexOf(day) >= 0) {
            return [
              suffixNo == null || suffixNo == '' ? true : suffixNo % 2 != day % 2,
              day % 2 == 0 ? '限单号' : '限双号'
            ]
          } else {
            return [
              suffixNo == null || suffixNo == '' ? true : suffixNo == date || suffixNo + 5 == date || suffixNo - 5 == date,
              ['限', date, '和', (date + 5) % 10].join('')
            ];
          }
        }
      }*/

      // 节假日不限行
      if (this.isHoliday(year, month, day)) {
        return [
          false,
          '不限行'
        ]
      }

      // 调休补班不限行
     /* if (date == 6 || date == 0) {
        return [
          false,
          '不限行'
        ]
      }*/


      // 周一1、6限行；周二2、7限行...，
      // 如果绑定车牌号，则判断车牌号和日期是否都是匹配；如果没有绑定车牌号，则返回限行信息
    /*  return [
        suffixNo == null || suffixNo == '' ? true : suffixNo == date || suffixNo + 5 == date || suffixNo - 5 == date,
        ['限', date, '和', (date + 5) % 10].join('')
      ]*/
      return [
        false,
        '不限行'
      ]
    }
}
