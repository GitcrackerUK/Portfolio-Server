# Work Tracker

    App to record work hours and generate earnings.
    At the moment application:
    - Gets start time and calculate earnings for the day based on the rate and extra shift allowance.
    - Gets rota combination and calculate days at work.
    - Returns object representation of full year with days at work, of days, earnings.

## Questions

- What should be base calendar object.
    There shouldn't be base calendar object.
    Every calendar object should be unique for every user.
- How calendar object should be initialized ?
    User should on the client side choose rota and start time and then send request to the back-end to generate calendar object and then save it in the DB. This calendar object should be assigned to the user.
- Where should be stored based calendar object.
    There should be uniq calendar object for every user. It should be initialized for every new user and then updated every single time when user add:
    - extra time/overtime.
    - extra days
    - absence day at work.
- User should has in the DB:
    - username.
    - email.
    - password.
    - uuid.
    In the case of user not being in the DB, they should be added to the db with the uuid.
- What should be a structure of DB for all app ?
    App for sure needs object with users and assigned to them calendar objects.
    [
        {
            user: topmax12,
            email:sfsf@fs.com,
            password:12233,
            calendar:[]
        }
    ]

## ToDo

- [ ] test addOvertimesToPayDay.
- [ ] add login route to WorkTracker.
- [ ] add register route to WorkTracker.
- [ ] connect backend to mongo DB.
- [ ] test connection to DB and schema.
- [ ] functionality to save new user without calendar.
- [ ] functionality to get user with calendar object.
- [ ] functionality to check if user exist.
- [ ] add DB to save user obj with calendar obj.
- [ ] count weekdays, fridays, saturdays, sundays.
- [ ] add counted days to calendar object.
- [ ] functionality to update user credential.
- [ ] Add test to check all week, 7 days and 24h for every day in the week to check start time. Test should loop over 24 hours and check if sum of the hours is 9.25.
- [ ] Test earnings from selected start time.
- [ ] Refactor getNameOfWeekDay as it probably can be one liner.
- [ ] Refactor calcPercent and add to this function "reduceFloat" to avoid repeating use of "reduceFloat".
- [ ] Add functionality to extractDateFromString to extract year/month (at the moment extracts month/year) and return in correct form for moment js. Functionality need detect where year is passed, as a first or as a second argument.
- [ ] Reduce getNameOfWeekDay by moving this function below returnDate and pass only date argument which has correct day and time.
- [x] fixed issue with multiple connection to mongo DB collections.
- [x] Get overtimes from selected cut off day to following.
- [x] Create functionality to calculate overtimes.
- [x] functionality to update calendar.
- [x] Change specific day finish time, and calculate earnings for the day and for the month.
- [x] test addOvertimeToDay
- [x] Add overtimes to pay day.
- [x] create schema for the calendar obj.
- [x] create schema for the user obj.
- [x] Get earnings from selected pay day to following pay day.
- [x] Add earnings for period between previous payday till current pay day to object calendar key payDay.
- [x] Split factory.js into three separate files createCalendar.js calculate.js development.js
- [x] Split factory.test.js into three separate files createCalendar.js calculate.js development.js
- [x] Create function to check if all year rota is present in the fullYearCalendar.json and if not, save all year calendar to this file. If calendar exists do not rewrite. It is to mimic Data Base.
- [x] Add store dir with store.js fullYearCalendar.json results.json
- [x] Create functionality to calculate earnings from hours generated with different start times.
- [x] Remove all console logs from and development helpers from calcEarnedForDay.
- [x] Extract functionality to calculate hours from start time. This functionality at the moment is in the  calcEarnedForDay. Reason is that if calcEarnedForDay return earnings not times what is at the moment all test for this function will fail. 
- [x] Crete functionality in the returnDate to receive date as a string NOT in the array.
- [x] Add test to function extractDateFromString.
- [x] Fix issue in the returnDate which is failing to return correct date with time in case of string "01/02/2022 22:00".
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Monday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Tuesday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Wednesday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Thursday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Friday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Saturday.
- [x] Add functionality to calculate day,evening,weekend hours for different starts for Sunday.
- [x] Add test to function calcEarnedForDay to check changes.
- [x] Add test to function returnDate.
- [x] Fix issue in the returnDate which is failing to return correct date with time in case of string "01/02/2022 22:00".
- [x] Crete functionality in the returnDate to take argument date as a string and the array with the string.
- [x] IMPORTANT !!!! Check functions for potential problem with mutation of moment object as it is mutable and every use of moment methods changes initial object !!!!
- [x] Add test to function returnDate.
- [x] Add test to function extractDateFromString.
- [x] Add functionality to returnDate date argument to pass in the array days or days,hours or days,hours,minutes.
- [x] Merge returnDate and getFullDate.
- [x] Fix issue with startTime default value.
- [x] Check if monday earnings calculation is correct for fixed 17:00.
- [x] Create functionally to calculate finish basic based on start time.
- [x] Create functionality to change start time.
- [x] Fix issue with wrong number of days of the month.
- [x] Add pay day to calendar.
- [x] Add cut off day to calendar.
- [x] Add calculation for additional/extra pay
- [x] Create full year calendar rota
- [x] Find pay day
- [x] Find cut off days
- [x] Add 12 months rota
- [x] Fix days counter. At the moment it counts array length and not off day for same, reaped off days.
- [x] Fix the problem with returning [Object] from nested objects
- [x] Remove long float numbers
- [x] Check pay for the same, reaped off days e.g Monday, Tuesday.
- [x] Check pay for the same, reaped off days in all possible combinations
