// const User = require('./models/user.model.js');
const router = require('express').Router();
const moment = require('moment');
require('dotenv').config();

const register = require('./routes/register');
const login = require('./routes/login');

const { 
    convertDaysArrayIntoRota,
    createYearCalendar,
    getMonthNumber,
    getMonthName,
    getDayNumber,
    createMonth,
    getYear,
} = require('./factory/createCalendar'); // initializing calendar obj

const {
    calcPayDay,
} = require('./factory/calculate.js'); // calculate earnings

const { writeToResults, writeToFile, checkIfOvertime } = require('./factory/development'); // development

const { Rota24_25, baseCurrentRate, weekCombinations, rates } = require('./store/store.js');
const FY = require('./store/fullYearCalendar.json');

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
router.post('/', (req, res) => {
    const startTime = '17:00';
    let rota = convertDaysArrayIntoRota(req.body.workTrackerData, getDayNumber, getMonthName, getYear);
    // if(req.body.workTrackerData.length >= 1){
        let yearEarnings = createYearCalendar({
            year:2024,
            months:Rota24_25
        }, getMonthNumber, createMonth, calcPayDay, baseCurrentRate, startTime);
        res.send(yearEarnings);
    // }else if (req.body.workTrackerData.length < 1){
    //     res.send({
    //         message:'No days off are selected !!'
    //     })
    // }
});

router.post('/', (req,res,next) => { 
    console.log('loading.');
    res.send('Post workTracker!!----->');
})

router.use('/register', register);
router.use('/login', login);

// const startTime = '17:00';

// const overtime = moment([2024,7,30,4,15]);

// const yearEarnings = createYearCalendar(Rota24_25, getMonthNumber, createMonth, calcPayDay, baseCurrentRate, startTime,2024);
// writeToFile(yearEarnings,'fullYear24_25.json')

// const editedCalc = addOvertimeToDay(yearEarnings, overtime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
// let overtimes = checkIfOvertime(editedCalc);

// writeToFile(overtimes,'overtimes.json')

// writeToFile(editedCalc,'fullYear24_25.json')
module.exports = router