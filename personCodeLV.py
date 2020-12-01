#!/usr/bin/python
# -*- coding: utf-8 -*-
import re
import datetime


def validLVPersonCode(personCode):
    if validLVPersonCodePattern(personCode):
        personCode = trimLVPersonCode(personCode)
        if validLVPersonCodeDate(
            personCode[0:2],
            personCode[2:4],
            (("20" if personCode[4:5] == "0" else "19")) + personCode[4:6],
        ):
            if validLVPersonCodeControlDigit(personCode):
                return True
            else:
                return False
        else:
            return False
        return True
    else:
        return False


def validLVPersonCodePattern(personCode):
    if re.match(
        "^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))\\d{2}(\\-?)\\d{5}$", personCode
    ):
        return True
    else:
        return False


def trimLVPersonCode(personCode):
    if personCode[6] == "-":
        personCode = personCode[0:6] + personCode[7:]
    return personCode


def validLVPersonCodeDate(day, month, year):
    try:
        datetime.datetime(int(year), int(month), int(day))
        return True
    except ValueError:
        return False


def validLVPersonCodeControlDigit(personCode):
    multipliers = [
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2,
    ]
    subSum = sum(
        map(
            lambda multiplier: int(personCode[multiplier[0]]) * multiplier[1],
            enumerate(multipliers),
        )
    )
    if (1101 - subSum) % 11 == int(personCode[10]):
        return True
    else:
        return False
