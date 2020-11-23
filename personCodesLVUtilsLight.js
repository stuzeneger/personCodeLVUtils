var PersonCodesUtils = function (personCode) {
     if (new RegExp('^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))\\d{2}(\\-?)\\d{5}$').test(personCode)) {
      if (personCode.charAt(6) === '-') {
        personCode = personCode.slice(0, 6) + personCode.slice(-5);
      }
      let day = personCode.slice(0, 2),
          month = personCode.slice(2, 2),
          year = personCode.slice(4, 2),
          date = new Date();
      year = (year.substr(0, 1) === '0' ? '20' : '19') + year;
      date.setFullYear(year, month, day);
      if (false === (date.getFullYear() == year
      && date.getMonth() == month
      && date.getDate() == day ? true : false)) {
        return false;
      } else if ((1101 - [1, 6, 3, 7, 9, 10, 5, 8, 4, 2].reduce(function (sum, value, index) {
        return sum += value * personCode[index]
      })) % 11 !== parseInt(personCode[10])) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

    this.outputPersonCode = function (personCode, isLV = false) {
        isLV = !isLV ? validLVPersonCode(personCode) : isLV;
        if (isLV && personCode.length === 11) {
            personCode = personCode.substr(0, 6) + '-' + personCode.substr(7, personCode.length);
        }
        return personCode;
    }
}
