import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class CopticDateProvider {

  public CopticMonthObjects = [
    {
      name: "Thoout",
      index: 0,
      month: 9,
      day: 11,
      leap: true
    },
    {
      name: "Paope",
      index: 1,
      month: 10,
      day: 11,
      leap: true
    },
    {
      name: "Hathor",
      index: 2,
      month: 11,
      day: 10,
      leap: true
    },
    {
      name: "Koiahk",
      index: 3,
      month: 12,
      day: 10,
      leap: true
    },
    {
      name: "Tobe",
      index: 4,
      month: 1,
      day: 9,
      leap: true
    },
    {
      name: "Meshir",
      index: 5,
      month: 2,
      day: 8,
      leap: true
    },
    {
      name: "Paremhotep",
      index: 6,
      month: 3,
      day: 10,
      leap: false
    },
    {
      name: "Parmoute",
      index: 7,
      month: 4,
      day: 9,
      leap: false
    },
    {
      name: "Pashons",
      index: 8,
      month: 5,
      day: 9,
      leap: false
    },
    {
      name: "Paone",
      index: 9,
      month: 6,
      day: 8,
      leap: false
    },
    {
      name: "Epep",
      index: 10,
      month: 7,
      day: 8,
      leap: false
    },
    {
      name: "Mesore",
      index: 11,
      month: 8,
      day: 7,
      leap: false
    },
    {
      name: "Pi Kogi Enavot",
      index: 12,
      month: 9,
      day: 6,
      leap: false
    }
  ];

  // enumerate Coptic months
  public CMs = {
    "Thoout": 0,
    "Paope": 1,
    "Hathor": 2,
    "Koiahk": 3,
    "Tobe": 4,
    "Meshir": 5,
    "Paremhotep": 6,
    "Parmoute": 7,
    "Pashons": 8,
    "Paone": 9,
    "Epep": 10,
    "Mesore": 11,
    "Pi Kogi Enavot": 12
  };

  public monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  public FastFeastNames = {
    NATIVITY: "Nativity",
    EPIPHANY: "Epiphany",
    ANNUNCIATION: "Annunciation",
    RESURRECTION: "Resurrection",
    PALM_SUNDAY: "Palm Sunday",
    ASCENSION: "Ascension",
    PENTECOST: "Pentecost",
    FEAST_OF_CIRCUMCISION: "Feast of the Circumcision",
    ENTRY_EGYPT: "Entrance of the Lord Christ into the Land of Egypt",
    WEDDING_CANA: "Wedding at Cana of Galilee",
    PRESENTATION_TEMPLE: "Presentation of the Lord Christ in the Temple",
    TRANSFIGURATION: "Transfiguration",
    COVENANT_THURSDAY: "Convenant Thursday",
    THOMAS_SUNDAY: "Thomas Sunday",
    ASSUMPTION_STMARY: "Assumption of St. Mary",
    FEAST_OF_APOSTLES: "Feast of the Apostles",
    COPTIC_NEW_YEAR: "Coptic New Year",
    FEAST_OF_CROSS: "Feast of the Cross",
    FEAST_OF_CROSS_3: "Feast of the Cross (3 days)",
    GREAT_LENT: "Great Lent",
    FAST_OF_APOSTLES: "Fast of the Apostles",
    FAST_STMARY: "Fast of St. Mary",
    NATIVITY_FAST: "The Holy Nativity Fast",
    GOOD_FRIDAY: "Good Friday",
    LAZARUS_SATURDAY: "Lazarus Saturday",
    JONAH_FEAST: "Jonah's Feast",
    JONAH_FAST: "Jonah's Fast",
    HOLY_50: "Holy 50 days (Pentecost)",
    NATIVITY_PARAMOUN: "Nativity Paramoun",
    EPIPHANY_PARAMOUN: "Epiphany Paramoun",
    NATIVITY_PERIOD: "Nativity Period"
  };

  constructor() {
    console.log('Hello CopticDateProvider Provider');
  }


  getCopticDate(year, monthIndex, day) {
    var copticMonth;
    var copticMonthIndex = 0;
    var copticDay = day;
    var copticYear = year - 283;
    var copticNewYearDay = this.isLeapYear(year + 1) ? 12 : 11;
    // Coptic New Year
    if (monthIndex >= 8 && day >= copticNewYearDay) {
      copticYear++;
    }

    for (var i = 0; i < this.CopticMonthObjects.length; i++) {
      var m = this.CopticMonthObjects[i];
      // wrap around to beginning
      var m_next = this.CopticMonthObjects[(i + 1) % this.CopticMonthObjects.length];

      var gregDate: any = new Date(year, monthIndex, day, 12, 0, 0);
      var copticMonthStartDate;
      var copticMonthEndDate;

      // special cases for new Gregorian year
      if (monthIndex == 0 && m.index == 3) {
        copticMonthStartDate = this.getCopticMonthDate(m, year - 1);
        copticMonthEndDate = this.getCopticMonthDate(m_next, year);
      } else if (monthIndex == 11 && m_next.index == 4) {
        copticMonthStartDate = this.getCopticMonthDate(m, year);
        copticMonthEndDate = this.getCopticMonthDate(m_next, year + 1);
      } else {
        copticMonthStartDate = this.getCopticMonthDate(m, year);
        copticMonthEndDate = this.getCopticMonthDate(m_next, year);
      }

      if (gregDate >= copticMonthStartDate && gregDate < copticMonthEndDate) {
        copticMonth = m.name;
        copticMonthIndex = m.index;
        copticDay = Math.floor((gregDate - copticMonthStartDate) / (1000 * 24 * 3600)) + 1;
        break;
      }
    }

    return {
      month: copticMonth,
      monthIndex: copticMonthIndex,
      day: copticDay,
      year: copticYear
    };
  };

  isLeapYear(year) {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
  };

  getCopticMonthDate(CopticMonthObject, year) {
    var leapYear = this.isLeapYear(year + 1);
    var m = CopticMonthObject.month;
    var d = CopticMonthObject.day;
    if (CopticMonthObject.leap && leapYear) {
      d++;
    }
    return new Date(year, m - 1, d);
  };


  getCopticDateString(year, monthIndex, day) {
    var copticDate = this.getCopticDate(year, monthIndex, day);
    return copticDate.month + " " + copticDate.day + ", " + copticDate.year;
  };


}
