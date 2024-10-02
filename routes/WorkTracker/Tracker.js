// const User = require('./models/user.model.js');
const router = require('express').Router();
require('dotenv').config();

const register = require('./routes/register');
const login = require('./routes/login');
const {
    convertDaysArrayIntoRota,
    extractDateFromString,
    createYearCalendar,
    getNameOfWeekDay,
    getCombinations,
    getMonthNumber,
    getMonthName,
    getDayNumber,
    addPDandCOD,
    findPayDays,
    returnDate,
    getYear,
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

const {writeToResults,writeToFile, checkIfOvertime} = require('./factory/development'); // development

const { Rota24_25, baseCurrentRate, weekCombinations, rates } = require('./store/store.js');
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
            reduceFloat,
            inWork
             );
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
    // calendar.basic_salary = calcEarnedFor_Month(calendar, reduceFloat);

    const rates = calendar.rates;
    rates.nights.rate = reduceFloat(calcPercent(rates.basic, rates.nights.percent));
    rates.weekends.rate = reduceFloat(calcPercent(rates.basic, rates.weekends.percent));
    rates.overtime.rate = reduceFloat(calcPercent(rates.basic, rates.overtime.percent));

    //returns calendar object with calculated values
    return calendar;
}


const rota = {
    date: ['09/2022'],
    OffDays: [3, 6, 7, 13, 14, 20, 21, 27, 28],
};
const rota2 = {
    date: [9,2022],
    OffDays: ['Monday', 'Tuesday'],
};

// This is express Api for workTracker which will be used to send tax year
// rota and will be used to fetch full tax year of data, to front end to fill
// up calendar page.

// What I need to do ? 
// I need to:
// 1. Create Api request sent form front-end to server
// 2. Create functionality to receive the front-end request.
// 3. Use rota from the request to generate the full year of data.
// 4. Send the full year of the data to the front-end within the same request.


router.get('/', (req, res) => {
    console.log(req.body);
    res.send('Tracker router');
});

router.post('/', (req,res,next) => { 
    console.log('loading.');
    res.send('Post workTracker!!----->');
})

router.use('/register', register);
router.use('/login', login);

const startTime = '17:00';

const overtime = moment([2024,0o07,30,4,15])

const yearEarnings = createYearCalendar(Rota24_25, getMonthNumber, createMonth, calcPayDay, baseCurrentRate, startTime,2024);
writeToFile(yearEarnings,'fullYear24_25.json')

const editedCalc = addOvertimeToDay(yearEarnings, overtime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
let overtimes = checkIfOvertime(editedCalc);

writeToFile(overtimes,'overtimes.json')

// writeToFile(editedCalc,'fullYear24_25.json')
module.exports = router