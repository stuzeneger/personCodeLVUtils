var PersonCodesUtils = function (personCode) {
    this.validLVPersonCode = function (personCode) {
        if (personCode.length !== 12
            && personCode.length !== 11
            && personCode.charAt(6) != '-') {
            return false;
        } else {
            if (personCode.charAt(6) === '-') {
                personCode = personCode.substr(0, 6) + personCode.substr(7, personCode.length);
            }
            if (personCode.match(/^[0-9]+$/) === null) {
                return false;
            } else {
                let day = personCode.substr(0, 2),
                    month = personCode.substr(2, 2),
                    year = personCode.substr(4, 2),
                    date = new Date();
                year = (year.substr(0, 1) === '0' ? '20' : '19') + year;
                date.setFullYear(year, month, day);
                if (false === (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day ? true : false)) {
                    return false;
                } else if (!(1101 - [1, 6, 3, 7, 9, 10, 5, 8, 4, 2].reduce(function (sum, value, index) {
                    return sum += value * personCode[index]
                }, 0)) % 11 == parseInt(personCode[10]) ? true : false) {
                    return false;
                }
            }
            return true;
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
