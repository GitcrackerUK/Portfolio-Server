// const User = require('./models/user.model.js');
const router = require('express').Router();
require('dotenv').config();

const register = require('./routes/register');
const login = require('./routes/login');

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
    getDuration,
    calcEarnedForDay,
    getFinishBasic,
    getIn_OffDays,
    findCutOfDays,
    reduceFloat,
    calcPercent,
    countDays,
    calcPayDay,
    addOvertimeToDay,
    getOnlyTime,
    getOnlyDate,
    addOvertimesToPayDay,
} = require('./factory/calculate.js'); // calculate earnings

const {writeToResults,writeFullYear, checkIfOvertime} = require('./factory/development'); // development

const { Rota22_23, Rota23_24, baseOldRate, baseNewRate, weekCombinations, rates } = require('./store/store.js');
const FY = require('./store/fullYearCalendar.json');
const moment = require('moment');

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
        let date = returnDate(DateArg, extractDateFromString, i, start_Time);
        let inWork = checkIN(OffDays, i, weekDay);
        let timesEarned = calcEarnedForDay( 
            calendar.rates,
            getHoursFromStart,
            getDuration,
            getFinishBasic,
            calcPercent,
            date,
<<<<<<< HEAD
            inWork)
=======
            reduceFloat,
            inWork
             );
>>>>>>> abc8f3c100f7a24b94d2b1ceb7cc872d7098d0d4
        calendar.calendar.push({
                date,
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
<<<<<<< HEAD
    calendar.basic_salary = getEarnedFor_Month(calendar, reduceFloat);
=======
    // calendar.basic_salary = calcEarnedFor_Month(calendar, reduceFloat);
>>>>>>> abc8f3c100f7a24b94d2b1ceb7cc872d7098d0d4

    const rates = calendar.rates;
    rates.nights.rate = reduceFloat(calcPercent(rates.basic, rates.nights.percent));
    rates.weekends.rate = reduceFloat(calcPercent(rates.basic, rates.weekends.percent));
    rates.overtime.rate = reduceFloat(calcPercent(rates.basic, rates.overtime.percent));

    //returns calendar object with calculated values
    return calendar;
}

<<<<<<< HEAD
const rota = {
    date: ['09/2022'],
    OffDays: [3, 6, 7, 13, 14, 20, 21, 27, 28],
};
const rota2 = {
    date: [09,2022],
    OffDays: ['Monday', 'Tuesday'],
};
=======
router.get('/', (req, res) => {
    res.send('Tracker router');
});

router.use('/register', register);
router.use('/login', login);

const startTime = '17:00';
const overtime = moment([2022,09,11,04,15])
let overtime1 = moment([2022,09,12,04,15])
>>>>>>> abc8f3c100f7a24b94d2b1ceb7cc872d7098d0d4

const yearEarnings = createYearCalendar(fullYearRota, getMonthNumber, createMonth, calcPayDay, baseNewRate, startTime);

let overtimes = checkIfOvertime(yearEarnings);
const editedCalc = addOvertimeToDay(yearEarnings, overtime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
let editedCalc1 = addOvertimeToDay(editedCalc, overtime1, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);

module.exports = router