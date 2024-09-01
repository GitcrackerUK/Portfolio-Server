const { getHoursFromStart, getDuration, getFinishBasic} = require('../../../../routes/WorkTracker/factory/calculate');
const moment =require('moment')

describe(
    "It should return object with calculated earnings for different start times and days of the week.",()=>{
        
        describe(
            "Monday",()=>{
                test('It should return object with night rate time and day rate time in hours.', ()=>{
                    let startTime = moment([2022,09,10,04,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 7.25,
                        "nightHours": 2,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with night rate time in hours and day rate time in hours.', ()=>{
                    let startTime = moment([2022,09,10,01,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 4.25,
                        "nightHours": 5,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,07,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,06,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with only day rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,12,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 9.25,
                        "nightHours": null,
                        "weekendHours": null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,15,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 7,
                        "nightHours":2.25,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,22,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 1.25,
                        "nightHours":8,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
                test('It should return object with day rate and night rate times in hours.', ()=>{
                    let startTime = moment([2022,09,10,21,00])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": 1.25,
                        "nightHours":8,
                        "weekendHours":null,
                        "overtime":null
                        })
                });
        }),
        describe(
            'Tuesday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,00,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,06,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,09,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,12,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,15,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,21,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,11,22,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe(
            'Wednesday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,00,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,06,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,09,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,12,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,15,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,21,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,12,22,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe(
            'Thursday',()=>{
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,00,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,06,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,09,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,12,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,15,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 7,
                    "nightHours":2.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,21,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 1.25,
                    "nightHours":8,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,13,22,45])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 2,
                    "nightHours":7.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
        })
        describe(
            'Friday',()=>{
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,00,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 3.25,
                    "nightHours":6,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,06,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,06,30])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,09,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,12,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9.25,
                    "nightHours":null,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,14,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 8,
                    "nightHours":1.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });
            test('It should return object with day rate and night rate times in hours.', ()=>{
                let startTime = moment([2022,09,14,13,00])
                expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                    "dayHours": 9,
                    "nightHours":0.25,
                    "weekendHours":null,
                    "overtime":null
                    })
            });

            (()=>{
                let day = null;
                let night = 1.25;
                let weekend = 8;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night},weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,14,22,45])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();

            (()=>{
                let day = 0.25;
                let night = 2;
                let weekend = 7;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,14,21,45])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = 0.5;
                let night = 2;
                let weekend = 6.75;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,14,21,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
        });
        describe( 'Saturday', ()=>{
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,15,00,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,15,12,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,15,15,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,15,22,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
        })
        describe( 'Sunday', ()=>{
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,16,00,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = null;
                let weekend = 9.25;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,16,12,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = 0.75;
                let weekend = 8.50;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,16,15,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
            (()=>{
                let day = null;
                let night = 7.75;
                let weekend = 1.50;
                let overtime = null;
               return test(`It should return object with day rate time ${day}, night rate times ${night}, weekend rate times ${weekend} in hours.`, ()=>{
                    let startTime = moment([2022,09,16,22,30])
                    expect(getHoursFromStart(getFinishBasic, getDuration, startTime)).toEqual({
                        "dayHours": day,
                        "nightHours":night,
                        "weekendHours":weekend,
                        "overtime":overtime,
                        })
                });
            })();
        })
    })