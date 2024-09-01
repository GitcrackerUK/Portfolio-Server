const { 
    extractDateFromString,
    createYearCalendar,
    getNameOfWeekDay,
    getCombinations,
    getMonthNumber,
    getMonthName,
    addPDandCOD,
    findPayDays,
    returnDate,
    checkIN,
    addId,
} = require('./factory/createCalendar'); // initializing calendar obj

const {
    getEarnedFor_Month,
    getHoursFromStart,
    calcEarnedForDay,
    getFinishBasic,
    getIn_OffDays,
    findCutOfDays,
    reduceFloat,
    calcPercent,
    countDays,
} = require('./factory/calculate.js'); // calculate earnings

const {writeToResults,writeFullYear} = require('./factory/development'); // development

const { fullYearRota, baseOldRate, baseNewRate, weekCombinations } = require('./store/store.js');

const moment = require('moment')

// date format month/year
function createMonth(rota, base_rate, start_Time){

    const {OffDays,date} = rota;
    const DateArg = returnDate(date,extractDateFromString);
    const month = DateArg.month();
    const year = DateArg.year();
    const monthName = getMonthName(month);
    const days = DateArg.daysInMonth();

    const FirstPayDay = '2022-04-29';
    const payDays = findPayDays(FirstPayDay);
    const cutOffD = findCutOfDays(payDays);


    let calendar = {
        name: monthName,
        fixedWorkingDays:null, // it is used only if working rota has same days in the week e.g 'Wednesday','Saturday'
        month: month + 1,
        year,
        numberOfDaysInCalMonth: days,
        OFF_Days:null,
        IN_Days:null,
        IN_weekDays: null,
        IN_fri: null,
        IN_sat: null,
        IN_sun: null,
        rates: {
            currency: 'GBP',
            basic: base_rate,
            nights: {
                percent: 25,
                rate: null,
            },
            weekends: {
                percent: 33,
                rate: null,
            },
            overtime: {
                percent: 50,
                rate: null,
            },
        },
        day_pay: {},
        basic_salary: {},
        calendar: [],
    };

    for (let i = 1; i <= days; i++) {
        let weekDay = getNameOfWeekDay(DateArg, i);
        let  date = returnDate(DateArg, extractDateFromString, i, start_Time);
        let inWork = checkIN(OffDays, i, weekDay);
        let timesEarned = calcEarnedForDay( 
            calendar.rates,
            getHoursFromStart,
            getFinishBasic,
            calcPercent,
            date,
            inWork)
        calendar.calendar.push({
            weekDay,
            day: i,
                start: inWork ? moment(date).format('HH:mm'):null,
                finishBasic: inWork ? getFinishBasic(date).format('HH:mm'):null,
            finishOvertime:null,
            hours: timesEarned.times,
            earnedFromHours: timesEarned.earned,
                inWork,
            payDay:addPDandCOD(payDays, DateArg, i),
            cutOffDay:addPDandCOD(cutOffD, DateArg, i),
            id:addId(),
        });
    };
    
    const d = getIn_OffDays(calendar);
    calendar.OFF_Days = d.off;
    calendar.IN_Days = d.in;

    const { w, f, sa, su } = countDays(calendar);
    calendar.IN_weekDays = w;
    calendar.IN_fri = f;
    calendar.IN_sat = sa;
    calendar.IN_sun = su;

    // calendar.day_pay = calcEarnedForDay(calendar.rates, calcPercent, reduceFloat, start_Time);
    calendar.basic_salary = getEarnedFor_Month(calendar, reduceFloat);

    const rates = calendar.rates
    rates.nights.rate = reduceFloat(calcPercent(rates.basic, rates.nights.percent))
    rates.weekends.rate = reduceFloat(calcPercent(rates.basic, rates.weekends.percent))
    rates.overtime.rate = reduceFloat(calcPercent(rates.basic, rates.overtime.percent))

    //returns calendar object with calculated values
    return calendar;
}

const rota = {
    date: ['09/2022'],
    OffDays: [3, 6, 7, 13, 14, 20, 21, 27, 28],
};
const rota2 = {
    date: [09,2022],
    OffDays: ['Monday', 'Tuesday'],
};


// const yearRota = createYearCalendar(fullYearRota, getMonthNumber, createMonth)

// const month1 = createMonth(rota, baseOldRate, '17:00')
const month = createMonth(rota, baseNewRate, '17:00')
// const payDays = findCutOfDays(findPayDays('2022-01-07'))
writeToResults(month)