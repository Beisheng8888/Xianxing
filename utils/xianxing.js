import {calendarUtil} from './calendar.js';

export var xianxingUtil = {
  holidays: [
    // 2020年
    '20200101',
    '20200104',
    '20200105',
    '20200111',
    '20200112',
    '20200118',
    '20200124',
    '20200125',
    '20200126',
    '20200127',
    '20200128',
    '20200129',
    '20200130',
    '20200202',
    '20200208',
    '20200209',
    '20200215',
    '20200216',
    '20200222',
    '20200223',
    '20200229',
    '20200301',
    '20200307',
    '20200308',
    '20200314',
    '20200315',
    '20200321',
    '20200322',
    '20200328',
    '20200329',
    '20200404',
    '20200405',
    '20200406',
    '20200411',
    '20200412',
    '20200418',
    '20200419',
    '20200425',
    '20200501',
    '20200502',
    '20200503',
    '20200504',
    '20200505',
    '20200510',
    '20200516',
    '20200517',
    '20200523',
    '20200524',
    '20200530',
    '20200531',
    '20200606',
    '20200607',
    '20200613',
    '20200614',
    '20200620',
    '20200621',
    '20200625',
    '20200626',
    '20200627',
    '20200704',
    '20200705',
    '20200711',
    '20200712',
    '20200718',
    '20200719',
    '20200725',
    '20200726',
    '20200801',
    '20200802',
    '20200808',
    '20200809',
    '20200815',
    '20200816',
    '20200822',
    '20200823',
    '20200829',
    '20200830',
    '20200905',
    '20200906',
    '20200912',
    '20200913',
    '20200919',
    '20200920',
    '20200926',
    '20201001',
    '20201002',
    '20201003',
    '20201004',
    '20201005',
    '20201006',
    '20201007',
    '20201008',
    '20201011',
    '20201017',
    '20201018',
    '20201024',
    '20201025',
    '20201031',
    '20201101',
    '20201107',
    '20201108',
    '20201114',
    '20201115',
    '20201121',
    '20201122',
    '20201128',
    '20201129',
    '20201205',
    '20201206',
    '20201212',
    '20201213',
    '20201219',
    '20201220',
    '20201226',
    '20201227',

    // 2021年
    '20210101',
    '20210102',
    '20210103',
    '20210109',
    '20210110',
    '20210116',
    '20210117',
    '20210123',
    '20210124',
    '20210130',
    '20210131',
    '20210206',
    '20210211',
    '20210212',
    '20210213',
    '20210214',
    '20210215',
    '20210216',
    '20210217',
    '20210221',
    '20210227',
    '20210228',
    '20210306',
    '20210307',
    '20210313',
    '20210314',
    '20210320',
    '20210321',
    '20210327',
    '20210328',
    '20210403',
    '20210404',
    '20210405',
    '20210410',
    '20210411',
    '20210417',
    '20210418',
    '20210424',
    '20210501',
    '20210502',
    '20210503',
    '20210504',
    '20210505',
    '20210509',
    '20210515',
    '20210516',
    '20210522',
    '20210523',
    '20210529',
    '20210530',
    '20210605',
    '20210606',
    '20210612',
    '20210613',
    '20210614',
    '20210619',
    '20210620',
    '20210626',
    '20210627',
    '20210703',
    '20210704',
    '20210710',
    '20210711',
    '20210717',
    '20210718',
    '20210724',
    '20210725',
    '20210731',
    '20210801',
    '20210807',
    '20210808',
    '20210814',
    '20210815',
    '20210821',
    '20210822',
    '20210828',
    '20210829',
    '20210904',
    '20210905',
    '20210911',
    '20210912',
    '20210919',
    '20210920',
    '20210921',
    '20210925',
    '20211001',
    '20211002',
    '20211003',
    '20211004',
    '20211005',
    '20211006',
    '20211007',
    '20211010',
    '20211016',
    '20211017',
    '20211023',
    '20211024',
    '20211030',
    '20211031',
    '20211106',
    '20211107',
    '20211113',
    '20211114',
    '20211120',
    '20211121',
    '20211127',
    '20211128',
    '20211204',
    '20211205',
    '20211211',
    '20211212',
    '20211218',
    '20211219',
    '20211225',
    '20211226',
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
      if (year == 2020 && month == 11 && day >= 7) {
        // 如果绑定车牌号，则判断车牌号和日期是否都是奇数或者都是偶数；如果没有绑定车牌号，则返回限行信息
        return [
          suffixNo == null ? true : suffixNo % 2 != day % 2,
          day % 2 == 0 ? '限单号' : '限双号'
        ]
      }

      // 单双号限行特殊处理，牡丹花会期间
      if (year == 2021) {
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
      }

      // 节假日不限行
      if (this.isHoliday(year, month, day)) {
        return [
          false,
          '不限行'
        ]
      }

      // 调休补班不限行
      if (date == 6 || date == 0) {
        return [
          false,
          '不限行'
        ]
      }

      // 周一1、6限行；周二2、7限行...，
      // 如果绑定车牌号，则判断车牌号和日期是否都是匹配；如果没有绑定车牌号，则返回限行信息
      return [
        suffixNo == null || suffixNo == '' ? true : suffixNo == date || suffixNo + 5 == date || suffixNo - 5 == date,
        ['限', date, '和', (date + 5) % 10].join('')
      ]
    }
}
