<?php

class PersonCodesHelper {
    
     public function validLVPersonCode(string $personCode): bool {            
        if (strlen($personCode) !== 12 && strlen($personCode) !== 11 && $personCode[6] != '-') {
            return false;
        } else {
            if ($personCode[6] === '-') {
                $personCode = substr($personCode, 0, 6) . substr($personCode, 7, strlen($personCode));
            }
            if (!preg_match('~[0-9]+~', $personCode)) {
                return false;
            } else {
                $day = substr($personCode, 0, 2);
                $month = substr($personCode, 2, 2);
                $year = substr($personCode, 4, 2);
                $year = (substr($year, 0, 1) === '0' ? '20' : '19') . $year;
                $date = DateTime::createFromFormat('d.m.Y', $day . '.' . $month . '.' . $year);
                if (false === ($date->format('Y') == $year && $date->format('m') == $month && $date->format('d') == $day ? true : false)) {
                    return false;
                } else if ((1101 - (1 * $personCode[0] + 6 * $personCode[1] + 3 * $personCode[2] + 7 * $personCode[3] + 9 * $personCode[4] + 10 * $personCode[5] + 5 * $personCode[6] + 8 * $personCode[7] + 4 * $personCode[8] + 2 * $personCode[9])) % 11 !== intval($personCode[10]) ? true : false) {
                    return false;
                } 
            }
            return true;
        }
    }

    function outputPersonCode(string $personCode, $isLV = false): string {
        $isLV = !$isLV ? $this->validLVPersonCode($personCode) : $isLV;
        if ($isLV) {
            return substr($personCode, 0, 6) . '-' . substr($personCode, 6, strlen($personCode));
        } else {
            return $personCode;
        }
    }
}
