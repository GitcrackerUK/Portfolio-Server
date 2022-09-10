const moment = require('moment')

function extractDateFromString(str){
    let date=[];
    date.push(parseInt(str.slice(0,2)))
    date.push(parseInt(str.slice(3,str.length)))

    return date
}

function returnDate(...args){
    let payload = [];
    args.forEach((i)=>{
        if(typeof i === 'string' && args.length === 1){
            payload = extractDateFromString(args[0])
        }else if (typeof i === 'string' && args.length >=2 ){
            payload.push(parseInt(i))
        }else if (typeof i === 'number'){
            payload.push(i)
        }
    })
    return moment([payload[1],payload[0]-1])
}

function getMonthName(m){
    return  moment().month(m).format('MMMM')
}

function getNameOfWeekDay(payload,i){
    const a =  moment(payload).date(i)
    return moment(a).format('dddd')
}

function checkIN(arr,day){
    let IN = null
    if(arr.length > 1){
        IN = true;
        arr.forEach((i)=>{
            if(i===day){
                IN = false
            }
        })
    }
   return IN
}

function getOffDays(arr){
    return arr.length
}
function countDays(obj){
    let counter = {
        w:0,
        sa:0,
        su:0
    }

    obj.calendar.forEach((i)=>{

    })

    return counter
}

function calcEarnedForDay(day){
    const days = {
        1:'weekday',
        2:'friday',
        3:'sat',
        4:'sun'
    }
    let payload;
    if(day===days[1]){
       const dayH = 5 * 16.75;
       const nightH = 4.25 * 20.93;
       payload = dayH + nightH
    }else if(day===days[2]){
        const dayH = 5 * 16.75;
        const nightH = 2 * 20.93;
        const weekendH = 2.25 * 22.27;
        payload = dayH + nightH + weekendH 
    }else if(day===days[3]){
        const weekendH = 9.25 * 22.27;
        payload = weekendH
    }else if(day===days[4]){
        const weekendH = 7 * 22.27;
        const nightH = 2.25 * 20.93;
        payload = weekendH + nightH
    }
    return payload
}

// date format month/year
function createMonth(rota){
    const {OffDays,date} = rota;
    const DateArg = returnDate(...date);
    const month = moment(DateArg).month();
    const year = moment(DateArg).year();
    const monthName = getMonthName(month);
    const days = moment().daysInMonth(month);
    const OFF_Days = getOffDays(OffDays);
    const IN_Days = days - OFF_Days ;

    let calendar = { 
        name:monthName,
        month:month+1,
        year,
        numberOfDaysInCalMonth:days,
        OFF_Days,
        IN_Days,
        IN_weekDays:null,
        IN_sat:null,
        IN_sun:null,
        pay_for_day:{
            weekDay:calcEarnedForDay('weekday'),
            friday:calcEarnedForDay('friday'),
            sat:calcEarnedForDay('sat'),
            sun:calcEarnedForDay('sun')
        },
        rates:{
                currency :'GBP',
                basic:16.75,
                nights:{
                    percent:25,
                    rate:20.93
                },
                weekends:{
                    percent:33,
                    rate:22.27
                },
                overtime:{
                    percent:50,
                    rate:25.12
                }
            },
        calendar:[]
    };
    
    for( let i = 1 ; i <= days; i++){
        calendar.calendar.push({
            day:i,
            in:checkIN(OffDays, i),
            weekDay:getNameOfWeekDay(DateArg,i),
        })
    }

    const {w,sa,su} = countDays(calendar)
    calendar.IN_weekDays = w
    calendar.IN_sat = sa
    calendar.IN_sun = su
    
    return calendar
}

const rota = {
    date:[09,2022],
    OffDays:[3,6,7,13,14,20,21,27,28]
}

const calendar = createMonth(rota)
console.log(calendar);