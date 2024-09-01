const moment = require('moment');

function getOnlyDate(date){
    return moment(date).format('YYYY-MM-DD');
}

function getOnlyTime(date){
    return moment(date).format('HH:mm');
}

function getDuration(a,b){
    return a.diff(b,'minutes') / 60
}

function getHoursFromStart( getFinishBasic, getDuration, start_Time ){
    
    // moment methods used in this function:
    //  - a.from(b)
    //  - [before].isBefore([after]) true
    //  - [before].isSameOrBefore([after]) true
    //  - [after].isAfter([before])  true
    //  - [after].isSameOrAfter([before])  true
    //  - a.diff(b,'minutes')

    function returnTime(date,h,m){
        return moment(date).hour(h).minute(m);
    }

    const startTime = moment(start_Time);
    let finishBasicTime = getFinishBasic(start_Time);

    const dayRateTime = returnTime(startTime,06,00);
    const nightRateTime = returnTime(startTime,22,00);
    const weekendRateTime = returnTime(startTime,00,00);

    const times = {
        nightHours:null,
        dayHours:null,
        weekendHours:null,
        overtime:null
    }

    function weekDay(start_Time){
        
        if ( start_Time.isSameOrAfter(returnTime(start_Time,00,00)) && start_Time.isBefore(dayRateTime) ){
            times.nightHours = dayRateTime.diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(dayRateTime,'minutes') / 60;
        }
        else if (start_Time.isSameOrAfter(dayRateTime) && finishBasicTime.isBefore(nightRateTime)){
            times.dayHours = finishBasicTime.diff(start_Time,'minutes') / 60;
        }
        else if (start_Time.isAfter(dayRateTime) && start_Time.isBefore(nightRateTime) && finishBasicTime.isSameOrAfter(nightRateTime) && finishBasicTime.isBefore(moment(dayRateTime).add(1,'day'))){
            times.dayHours = nightRateTime.diff(start_Time,'minutes') / 60;
            times.nightHours = finishBasicTime.diff(nightRateTime,'minutes') / 60;
        }
        else if ( start_Time.isBefore(nightRateTime) && finishBasicTime.isSameOrAfter(moment(dayRateTime).add(1,'day'))){
            let nextDayHours = 0
            times.dayHours = nightRateTime.diff(start_Time,'minutes') / 60;
            nextDayHours = finishBasicTime.diff(moment(dayRateTime).add(1,'day'),'minutes') / 60;
            times.dayHours += nextDayHours
            times.nightHours = finishBasicTime.diff(nightRateTime,'minutes') / 60 - nextDayHours;
        }
        else if(start_Time.isSameOrAfter(nightRateTime)) {
            times.nightHours = moment(dayRateTime).add(1,'day').diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(moment(dayRateTime).add(1,'day'),'minutes') / 60;
        }

    }
    
    function friday(start_Time){
        if ( start_Time.isSameOrAfter(returnTime(start_Time,00,00)) && start_Time.isBefore(dayRateTime) ){
            times.nightHours = dayRateTime.diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(dayRateTime,'minutes') / 60;
        }
        else if (start_Time.isSameOrAfter(dayRateTime) && finishBasicTime.isBefore(nightRateTime)){
            times.dayHours = finishBasicTime.diff(start_Time,'minutes') / 60;
        }
        else if (start_Time.isAfter(dayRateTime) && finishBasicTime.isSameOrAfter(nightRateTime) && finishBasicTime.isSameOrBefore(moment(weekendRateTime).add(1,'day'))){
            times.dayHours = getDuration(nightRateTime,start_Time);
            times.nightHours = getDuration(finishBasicTime,nightRateTime);
        }else if ( start_Time.isAfter(dayRateTime) && start_Time.isBefore(nightRateTime) && finishBasicTime.isAfter(moment(weekendRateTime).add(1,'day'))){
            times.dayHours = getDuration(nightRateTime,start_Time);
            times.nightHours = getDuration(moment(weekendRateTime).add(1,'day'),start_Time) - times.dayHours;
            times.weekendHours = getDuration(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }else if ( start_Time.isSameOrAfter(nightRateTime) && finishBasicTime.isAfter(moment(dayRateTime).add(1,'day'))){
            times.nightHours = getDuration(moment(weekendRateTime).add(1,'day'),start_Time);
            times.weekendHours = getDuration(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }
    }
    function saturday(start_Time){
        if(start_Time.isAfter(weekendRateTime) && start_Time.isBefore(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDuration(finishBasicTime, start_Time)
        }
    }
    function sunday(start_Time){
        if( start_Time.isAfter(weekendRateTime) && finishBasicTime.isSameOrBefore(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDuration(finishBasicTime,start_Time)
        }else if( start_Time.isAfter(weekendRateTime) && finishBasicTime.isAfter(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDuration(moment(weekendRateTime).add(1,'day'), start_Time);
            times.nightHours = getDuration(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }else if( start_Time.isBefore(moment(weekendRateTime).add(1,'day')) && finishBasicTime.isAfter(moment(dayRateTime).add(1,'day'))){
            times.weekendHours = getDuration(weekendRateTime, start_Time);
            times.nightHours = getDuration(finishBasicTime,moment(weekendRateTime).add(1,'day')) /// need to be finished !!!
            times.dayHours = getDuration(moment(finishBasicTime).add(1,'day'),moment(dayRateTime).add(1,'day'))
        }
    }

    if( moment(startTime).format('dddd')==='Monday' ||  moment(startTime).format('dddd')==='Tuesday' || moment(startTime).format('dddd')==='Wednesday' || moment(startTime).format('dddd')==='Thursday'){
        weekDay(startTime);
    }
    else if(moment(startTime).format('dddd')==='Friday'){
        friday(startTime);
    }
    else if(moment(startTime).format('dddd')==='Saturday'){
        saturday(startTime);
    }else if(moment(startTime).format('dddd')==='Sunday'){
        sunday(startTime);
    }

    return times;
};

function findCutOfDays(payDays){
    let arr = [];
    if (payDays?.length >= 1) {
        payDays.forEach((element, i) => {
            arr.push( moment(element, 'YYYY-MM-DD').subtract(8, 'd'));
        });
        return arr;
    }
    throw 'No Pay Dates selected to generate cut off dates!!!'
}

function getFinishBasic(start_Time){
    return moment(start_Time).add(9,'hours').add(15,'minutes')
}

function calcPayDay(F_Y) {

    let reducedYear = [];
    let yearPD = [];
    let year = [];
    
    F_Y.forEach((ele, i) => {
        // looping over 12 months 
        let calendar = ele.calendar
        let PD = 0;
        let prePD = 0;
        let postPD = 0;
        let month = {
            name:null,
            calendar:[]
        };
        month.name = ele.name
        calendar.forEach((day,i)=>{
            // loops over days 
            if(day.payDay){
                PD = day.day
            }
            if(!PD){
                prePD = reduceFloat(day.earnedFromHours.TotalEarned + prePD)
            }else if(PD){
                postPD = reduceFloat(day.earnedFromHours.TotalEarned + postPD)
            }
            month.calendar.push({
                weekday:day.day,
                pay:day.earnedFromHours.TotalEarned,
                prePD,
                postPD,
            })
        })
        year.push(month);
    });

    year.forEach((month, i) => {
        let prePD = month.calendar[month.calendar.length - 1].prePD;
        let postPD = month.calendar[month.calendar.length - 1].postPD;
        let name = month.name;
        reducedYear.push({name, prePD, postPD});
    });

    reducedYear.forEach((m,i)=>{
        let PD ;
        let N = m.name;
        if(reducedYear[i-1]){
          PD = reduceFloat(reducedYear[i-1].postPD + m.prePD)
          yearPD.push({
            N,
            PD
        })
        } else if (!reducedYear[i-1]){
          PD = m.prePD;
          yearPD.push({
            N,
            PD
        })
        }
    })

    F_Y.forEach((month,i)=>{
        yearPD.forEach((pay_Day,i)=>{
            let basic = pay_Day.PD
            if(month.name === pay_Day.N){
                month.calendar.forEach((day,i)=>{
                    if(day.payDay){
                        day.payDay = {basic}
                    }
                })
            }
        })
    })
    return F_Y
}

function getEarnedFor_Month(payload, reduceFloat){
    let pay = payload.day_pay
    
    const weekDaysTotal = reduceFloat(payload.IN_weekDays * pay.weekDay);
    const fridaysTotal = reduceFloat(payload.IN_fri * pay.friday);
    const saturdayTotal = reduceFloat(payload.IN_sat * pay.sat);
    const sundayTotal = reduceFloat(payload.IN_sun * pay.sun);
    const Total = reduceFloat(fridaysTotal + sundayTotal + weekDaysTotal + saturdayTotal);

    return {
        weekDaysTotal,
        fridaysTotal,
        saturdayTotal,
        sundayTotal,
        Total
    }
}

//** @function 
/** @name calcEarnedForDay
*/
function calcEarnedForDay(
    rates,
    getHoursFromStart,
    getDuration,
    getFinishBasic,
    calc,
    start_Time,
    reduceFloat,
    in_Work
    ){
        let payload = {
            times: {
                nightHours:null,
                dayHours:null,
                weekendHours:null,
                Hours:null,
            },
            earned: {
                nightEarned: null,
                dayEarned: null,
                weekendEarned: null,
                overtimeEarned: null,
                TotalEarned: null,
            },
        };

    const { basic, nights, weekends } = rates;
        if(in_Work){
        payload.times = getHoursFromStart( getFinishBasic, getDuration, start_Time);
        let times = payload.times;
        payload.earned.nightEarned = payload.times.nightHours ? calculateEarned(basic, nights.percent, times.nightHours, reduceFloat, calc) : null;
        payload.earned.dayEarned = payload.times.dayHours ? calculateEarned(basic, 0 ,times.dayHours, reduceFloat, calc) : null;
        payload.earned.weekendEarned = payload.times.weekendHours ? calculateEarned(basic, weekends.percent, times.weekendHours, reduceFloat, calc) : null;
        payload.earned.overtimeEarned = payload.times.overtimeHours ? calculateEarned(basic, 0, times.overtimeHours, reduceFloat, calc) : null;
        payload.earned.TotalEarned = getTotalEarned(payload.earned,reduceFloat);
    }
        
    return payload;
}

function getTotalEarned(obj,reduceFloat){
    let i = 0;
    Object.keys(obj).forEach((key)=> {
        if(obj[key]){
            i += obj[key]
        }
    })
    return reduceFloat(i)
}

function calculateEarned( basic, percent , time, reduceF, calc){
    return reduceF(calc(basic,percent) * time )
}
function countDays(obj){
    let counter = {
        w:0,
        f:0,
        sa:0,
        su:0
    }
    const wd = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    obj.calendar.forEach((i)=>{
        if(i.in && (i.weekDay===wd[0] || i.weekDay===wd[1] || i.weekDay===wd[2] || i.weekDay===wd[3])){
            counter.w++
        }else if(i.weekDay===wd[4] && i.in){
            counter.f++
        }else if(i.weekDay===wd[5] && i.in){
            counter.sa++
        }else if(i.weekDay===wd[6] && i.in){
            counter.su++
        }
    })

    return counter
}
function getIn_OffDays(calendar){
    let num = {
        in:0,
        off:0
    };
    calendar.calendar.forEach((obj)=>{
        if(!obj.in){
            num.off++
        }else if(obj.in){
            num.in ++
        }
    })
    return num
}

function reduceFloat(payload){
    return parseFloat(payload.toFixed(2))
}

function calcPercent(basic,extraRate){
    let extra = 0 
    if(extraRate){
        extra = (basic / 100) * extraRate
    }
    return basic + extra
}

function addOvertimeToDay(cal, finish_Overtime, getOnlyDate, getOnlyTime, getDuration, calc, rates, addOvertimesToPayDay){
    const OV_date = getOnlyDate(finish_Overtime);
    const OV_time = getOnlyTime(finish_Overtime);

    cal.forEach((M)=>{
        M.calendar.forEach((D)=>{
            if(getOnlyDate(D.date) === OV_date){
                const overtimeDuration = getDuration(moment(finish_Overtime).add(1,'day'), D.date) - 9.25
                D.finishOvertime = OV_time === D.finishBasic ? null : OV_time;
                D.hours.overtime = overtimeDuration >= 0.25 ? overtimeDuration : null;
                D.earnedFromHours.overtimeEarned = reduceFloat(D.hours.overtime  * calc(rates.base, rates.overtime))
                D.earnedFromHours.TotalEarned = reduceFloat( D.earnedFromHours.TotalEarned + D.earnedFromHours.overtimeEarned )
            }
        })
    });
    // Is it good idea to update pay day as overtime is added ?
    //  YES
    // Will do test fail ?
    //  NO, as test for addOvertimeToDay check if overtime is added to specific day and doesn't change anything previously set up.
    // What Can I do ??
    //  I can update tests. 
    return addOvertimesToPayDay(cal);
}

function addOvertimesToPayDay(cal){

        let reducedYear = [];
        let yearCOD = [];
        let year = [];
        
        cal.forEach((ele, i) => {
            // looping over 12 months 
            let calendar = ele.calendar
            let COD = 0;
            let preCOD = 0;
            let postCOD = 0;
            let month = {
                name:null,
                calendar:[]
            };
            month.name = ele.name
            calendar.forEach((day,i)=>{
                // loops over days 
                if(day.cutOffDay){
                    COD = day.day
                }
                if(!COD){
                    preCOD = reduceFloat(day.earnedFromHours.overtimeEarned + preCOD)
                }else if(COD){
                    postCOD = reduceFloat(day.earnedFromHours.overtimeEarned + postCOD)
                }
                month.calendar.push({
                    weekday:day.day,
                    pay:day.earnedFromHours.overtimeEarned,
                    preCOD,
                    postCOD,
                })
            })
            year.push(month);
        });
    
        year.forEach((month, i) => {
            let preCOD = month.calendar[month.calendar.length - 1].preCOD;
            let postCOD = month.calendar[month.calendar.length - 1].postCOD;
            let name = month.name;
            reducedYear.push({name, preCOD, postCOD});
        });
    
        reducedYear.forEach((m,i)=>{
            let COD ;
            let N = m.name;
            if(reducedYear[i-1]){
              COD = reduceFloat(reducedYear[i-1].postCOD + m.preCOD)
              yearCOD.push({
                N,
                COD
            })
            } else if (!reducedYear[i-1]){
              COD = m.preCOD;
              yearCOD.push({
                N,
                COD
            })
            }
        })
    
        cal.forEach((month,i)=>{
            yearCOD.forEach((pay_Day,i)=>{
                let overtime = pay_Day.COD

                if(month.name === pay_Day.N){
                    month.calendar.forEach((day,i)=>{
                        let total = day.payDay.basic + overtime 
                        if(day.payDay){
                            day.payDay = {...day.payDay, overtime, total}
                        }
                    })
                }
            })
        })
    return cal;
}

module.exports = {
    getIn_OffDays,
    countDays,
    calcEarnedForDay,
    getEarnedFor_Month,
    calcPercent,
    findCutOfDays,
    reduceFloat,
    getFinishBasic,
    getHoursFromStart,
    getDuration,
    calcPayDay,
    addOvertimeToDay,
    getOnlyTime,
    getOnlyDate,
    addOvertimesToPayDay,
}