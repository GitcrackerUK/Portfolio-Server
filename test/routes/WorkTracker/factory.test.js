const {calcPercent, extractDateFromString, returnDate, calcEarnedForDay, getFinishBasic} = require('../../../routes/WorkTracker/factory.js');
const moment =require('moment')

describe(
    "Test for the method to extract integer from the string. Order of the returned integers doesn't matter at the moment.", ()=>{

        test('Should return array with numbers', () => {
            expect(extractDateFromString('12/2022')).toEqual([12, 2022]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([01, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('1/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2')).toEqual([2002, 2]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2/3')).toEqual([2002, 2, 3]);
        });
    }
);

describe(
    "It should return moment object with correct date accordingly to argument.",()=>{
        
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate([01,2022],extractDateFromString)).toEqual(moment([2022,01-1]))
        });
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate([02,2022],extractDateFromString)).toEqual(moment([2022,2-1]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate([01,02,2022],extractDateFromString)).toEqual(moment([2022,2-1,01]))
        });
        test('Should return moment object with correct day, month, year, hour and minute', ()=>{
            expect(returnDate([01,02,2022,22,00],extractDateFromString)).toEqual(moment([2022,2-1,01,22,00]))
        });
        test('Should return moment object with correct month and year', ()=>{
            expect(returnDate(['09/2022'],extractDateFromString)).toEqual(moment([2022,09-1]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate(['01/09/2022'],extractDateFromString)).toEqual(moment([2022,09-1,01]))
        });
        test('Should return moment object with correct day month and year', ()=>{
            expect(returnDate(['1/09/2022'],extractDateFromString)).toEqual(moment([2022,09-1,1]))
        });
        test('Should return moment object with correct day month and year from the string', ()=>{
            expect(returnDate('1/09/2022',extractDateFromString)).toEqual(moment([2022,09-1,1]))
        });
        test('Should return moment object with correct day, month, year, hour and minute', ()=>{
            expect(returnDate(["01/02/2022 22:00"],extractDateFromString)).toEqual(moment([2022,2-1,01,22,00]))
        });
        test('Should return moment object with correct day, month, year, hour and minute from the string', ()=>{
            expect(returnDate("01/02/2022 22:35",extractDateFromString)).toEqual(moment([2022,2-1,01,22,35]))
        });
    })
describe(
    "It should return object with calculated earnings for different start times and days of the week.",()=>{
        
        test('It should return object with night rate minutes and day rate minutes.', ()=>{
            let startTime = moment([2022,09,10,04,00])
            expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                   "dayHours": 7.25,
                   "nightHours": 2,
                })
        });
        test('It should return object with night rate minutes and day rate minutes.', ()=>{
            let startTime = moment([2022,09,10,01,00])
            expect(calcEarnedForDay(getFinishBasic,startTime )).toEqual({
                   "dayHours": 4.25,
                   "nightHours": 5,
                })
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
