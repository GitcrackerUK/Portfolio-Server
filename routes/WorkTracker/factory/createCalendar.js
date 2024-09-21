const {weekCombinations} = require('../store/store');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

function addId(){
    return uuidv4()
};

function getMonthName(m){
    return  moment().month(m).format('MMMM');
};

function getMonthNumber(name){
    return moment().month(name).format("M");
};
function getDayNumber(day){
    return moment().date(day)
}

function getNameOfWeekDay(payload,i){
    const a = moment(payload).date(i)
    return moment(a).format('dddd')
};

function extractDateFromString(str){
    let date = [];
    str.split(/[/" ":]/).forEach((i)=>{
        date.push(parseInt(i))
    })
    return date
};

function returnDate(dateArg, extractDateFromString, day, startTime){
    let payload = [];
    let dateElement = '';
    if(Array.isArray(dateArg)){
            dateArg.forEach((i)=>{
                if(typeof i === 'string' && dateArg.length === 1){
                    payload = extractDateFromString(dateArg[0])
                }else if (typeof i === 'string' && dateArg.length >=2 ){
                    payload.push(parseInt(i))
                }else if (typeof i === 'number'){
                    payload.push(i)
                }
            })
        }
    if( !moment.isMoment(dateArg) && typeof dateArg === 'string'){
        payload = extractDateFromString(dateArg)
    }
    if (moment.isMoment(dateArg) && startTime && day) {
            let H = startTime.substring(0, 2);
            let M = startTime.substring(3, 5);
            dateElement = moment(dateArg).date(day).hour(H).minute(M)
    }
    if(payload.length===2){
        dateElement = moment([payload[1], payload[0]-1]);
    }else if(payload.length === 3){
        dateElement = moment([payload[2], payload[1]-1,payload[0]])
    }else if(payload.length === 4){
        dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3]])
    }else if(payload.length === 5){
        dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3],payload[4]])
    }
    return dateElement
};

function checkIN(arr,day,weekDay){
    let IN = null
    if(arr.length >= 5){
        IN = true;
        arr.forEach((i)=>{
            if(i===day){
                IN = false
            }
        })
    }else if(arr.length === 2){
        IN = true;
        arr.forEach((i)=>{
            if(i===weekDay){
                IN = false
            }
        })
    }
   return IN
};

//**@function
/** @name  addPDandCOD
/ function checks dates generated by helper functions findPayDays() and findCutOfDays() and adds pay dates and
/ cut off dates to a calendar object.
*/
function addPDandCOD(payDays, date, day) {
    let Element = false // pay day or cut off day 
    let DT = moment(date).date(day) // date
    payDays.forEach((ele, i)=>{
        if(moment(DT).isSame(ele)){
            Element = true 
        }
    });
    return Element;
};

function findPayDays(payDay){
    if(payDay){
        let arr = [];
        arr.push(moment(payDay,"YYYY-MM-DD"));
        for(let i = 0; i <= 11;i++){
            arr.push(moment(arr[i], "YYYY-MM-DD").add(4,'w'));
        };
        return arr;
    }
    throw 'No Date Specified';
};

function getCombinations(weekCombinations, createMonth){
    let result = []
    weekCombinations.forEach((i)=>{
        const rota = {
            date:[09,2022],
            OffDays:i
        }
       result.push(createMonth(rota))
    })
    return result;
};

function createYearCalendar(rota, getMonthNumber, createMonth, calcPayDay, baseNewRate, start_Time, year){
    let yearCalendar = [ ]
    const yearPlus = year + 1;
    let date = [year];
    let OffDays = [];
    for( const prop in rota){
        let monthN = getMonthNumber(prop)

        if(monthN <= 3 ){
            date.pop();
            date.push(yearPlus);
        }

        if(date.length === 1){
            date.unshift(monthN)
        }else if(date.length === 2){
            date.shift()
            date.unshift(getMonthNumber(prop))
        }
        OffDays = rota[prop]

        yearCalendar.push(
            createMonth({
                date,
                OffDays
            },baseNewRate, start_Time)
        )
        }

    return calcPayDay(yearCalendar);
};

function convertDaysArrayIntoRota(array, getDayNumber) {
    let rota = {
        year: null,
        months: {
            April: [],
            May: [],
            Jun: [],
            July: [],
            August: [],
            September: [],
            October: [],
            November: [],
            December: [],
            January: [],
            February: [],
            March: []
        }
    }
    if (array.length != 0) {
        array.forEach((day) => {
            switch (getMonthName(day)) {
                case "January":
                    rota.months.January.push(getDayNumber(day))
                    break;
                case "February":
                    rota.months.February.push(getDayNumber(day))
                    break;
                case "March":
                    rota.months.March.push(getDayNumber(day))
                    break;
                case "April":
                    rota.months.April.push(getDayNumber(day))
                    break;
                case "May":
                    rota.months.May.push(getDayNumber(day))
                    break;
                case "June":
                    rota.months.June.push(getDayNumber(day))
                    break;
                case "July":
                    rota.months.July.push(getDayNumber(day))
                    break;
                case "August":
                    rota.months.August.push(getDayNumber(day))
                    break;
                case "September":
                    rota.months.September.push(getDayNumber(day))
                    break;
                case "October":
                    rota.months.October.push(getDayNumber(day))
                    break;
                case "November":
                    rota.months.November.push(getDayNumber(day))
                    break;
                case "December":
                    rota.months.December.push(getDayNumber(day))
                    break;
                default:
                    break;
            }
        })
        return rota
    }
}

module.exports = {
    convertDaysArrayIntoRota,
    extractDateFromString,
    returnDate,
    getMonthName,
    checkIN,
    getNameOfWeekDay,
    getCombinations,
    findPayDays,
    getMonthNumber,
    createYearCalendar,
    addPDandCOD,
    addId,
    getDayNumber,
};