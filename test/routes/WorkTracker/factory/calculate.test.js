const initialYear = require('../../../../routes/WorkTracker/store/initialYear.json')
const factory = '../../../../routes/WorkTracker/factory/'
const store = '../../../../routes/WorkTracker/store/'
const {calcPercent, getHoursFromStart, getDuration, getFinishBasic, calcEarnedForDay, reduceFloat, addOvertimeToDay, getOnlyDate, getOnlyTime, addOvertimesToPayDay} = require(`${factory}calculate`);
const { rates } = require(`${store}/store`)
const calendar = require(`${store}/fullYearCalendar`);
const moment = require('moment')

describe('Test of the function calcEarnedForDay. It should return object with hours and earnings calculated from the hours.', ()=>{
    const rates = {
        currency: 'GBP',
        basic: 16.75,
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
    };
    (()=>{
        let key = 'times'
        let startTime = moment([2022,09,16,22,30])
        return test(`It should have key '${key}'`, ()=>{
            expect(calcEarnedForDay(
                rates,
                getHoursFromStart,
                getDuration,
                getFinishBasic,
                calcPercent,
                startTime,
                reduceFloat)).toHaveProperty('times')
        })
    })();

    (()=>{
        let key = 'earned'
        let startTime = moment([2022,09,16,22,30])
        return test(`It should have key '${key}'`, ()=>{
            expect(calcEarnedForDay(
                rates,
                getHoursFromStart,
                getDuration,
                getFinishBasic,
                calcPercent,
                startTime,
                reduceFloat)).toHaveProperty('times')
        })
    })();
})

describe('Checks if function reduces float from the number and also value in the object.', ()=>{
    test('Returns integer from float', ()=>{
        expect(reduceFloat(2.112121212)).toBe(2.11)
    });
})

test('Should return 1.5', () => {
    expect(calcPercent(1, 50)).toBe(1.5);
});
test('Should return 12.5', () => {
    expect(calcPercent(10, 25)).toBe(12.5);
});
test('Should return 20', () => {
    expect(calcPercent(10, 100)).toBe(20);
});
test('Should return 1.01', () => {
    expect(calcPercent(1, 1)).toBe(1.01);
});

describe('Check if function addOvertimeToDay adds finish time for overtime and calculate earnings for that specific day',()=>{
    (()=>{
            const overtime = 1
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,03,15])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })();
    (()=>{
            const overtime = 2
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,04,15])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })();
    (()=>{
            const overtime = 2.5
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,04,45])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })();
    (()=>{
            const overtime = 3.5
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,05,45])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })();
    (()=>{
            const overtime = 4.5
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,06,45])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })();
    (()=>{
            const overtime = null
            const earned = overtime * calcPercent(rates.base, rates.overtime)
            const finishTime = moment([2022,09,10,00,45])
            const date = getOnlyDate(finishTime);
            const time = getOnlyTime(finishTime);
            return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
              const updated = addOvertimeToDay(calendar, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
              updated.forEach((M)=>{
                M.calendar.forEach((D)=>{
                    if(date === getOnlyDate(D.date)){
                        expect(D.hours.overtime).toBe(overtime)
                        expect(D.earnedFromHours.overtimeEarned).toBe(reduceFloat(earned))
                    }
                })
              })
            })
    })()
})

describe('Check if function addOvertimesToPayDay adds overtime earnings to payDay in the calendar object. Function should check cut off dates and add earnings to correct month.',()=>{
(()=>{

    // check cutoff day
    // check to which payDay overtime should be added 
    // compare expectation with calendar object
    const overtime = null
    const finishTime = moment([2022,09,05,03,45])
    const earned = overtime * calcPercent(rates.base, rates.overtime)
    const date = getOnlyDate(finishTime);
    return test(`Should add ${overtime} to overtime and calculate ${earned}`, ()=>{
    const updatedCalendar = addOvertimeToDay(initialYear, finishTime, getOnlyDate, getOnlyTime, getDuration, calcPercent, rates, addOvertimesToPayDay);
    
    function loopOverCalendar(cal){
        let result;
        cal.forEach((M)=>{
            let cutoff = false
            M.calendar.forEach((D,i)=>{
                if(D.cutOffDay){
                    cutoff = true;
                }
                if(!cutoff && date === getOnlyDate(D.date)){
                   M.calendar.forEach((D2,i)=>{
                    if(D2.payDay){
                        result = {day:D.day,pay:D.payDay.total}
                    }
                   })
                }
                // else if( cutoff && (date === getOnlyDate(D.date))){
                //     cal[i+1].calendar.forEach((D2,i)=>{
                //         if(D2.payDay){
                //             result = D2.payDay.total
                //         }
                //     })
                // }
            })
        })
        return result
    }
    
    const initial = loopOverCalendar(initialYear);
    console.log(initial);
    const updated = loopOverCalendar(updatedCalendar);
    console.log(updated);
    })
})();
})
