class PersonCodesUtils {
    constructor() {
        this.multipliers = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        this.personCodeDividerPosition = 6;
        this.personCodeFullLength = 12;
        this.personCodeDividerSymbol = '-';
    }

    validLVPersonCode(personCode) {
        if (personCode.length !== this.personCodeFullLength
            && personCode.length !== this.personCodeFullLength - 1
            && personCode.charAt(this.personCodeDividerPosition) != this.personCodeDividerSymbol) {
            return false;
        } else {
            if (personCode.charAt(this.personCodeDividerPosition) === this.personCodeDividerSymbol) {
                personCode = this.trimPeersonCode(personCode);
            }
            if (personCode.match(/^[0-9]+$/) === null) {
                return false;
            } else {
                let day = personCode.substr(0, 2),
                    month = personCode.substr(2, 2),
                    year = personCode.substr(4, 2);
                if (!this.validLVPersonCodeDate(day, month, year)) {
                    return false;
                } else if (!this.validLVPersonCodeControlDigit(personCode)) {
                    return false;
                }
            }
            return true;
        }
    }

    outputPersonCode(personCode, isLV = false) {
        isLV = !isLV ? validLVPersonCode(personCode) : isLV;
        return !isLV ? personCode : personCode.substr(0, 6) + '-' + personCode.substr(6, personCode.length); 
    }

    trimPersonCode(personCode) {
        return personCode = personCode.substr(0, this.personCodeDividerPosition)
            + personCode.substr(this.personCodeDividerPosition, personCode.length);
    }

    validLVPersonCodeDate(day, month, year) {
        let date = new Date();
        year = (year.substr(0, 1) === '0' ? '20' : '19') + year;
        date.setFullYear(year, month, day);
        return date.getFullYear() == year && date.getMonth() == month && date.getDate() == day ? true : false;
    }

    validLVPersonCodeControlDigit(personCode) {
        return (1101 - this.multipliers.reduce(function (sum, value, index) {
            return sum += value * personCode[index]
        }, 0)) % 11 == parseInt(personCode[10]) ? true : false;
    }
}

