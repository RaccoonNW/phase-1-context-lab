function createEmployeeRecord(empRec){
    return {
        firstName: empRec[0],
        familyName: empRec[1],
        title: empRec[2],
        payPerHour: empRec[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empRec){
    return empRec.map(function(data){
        return createEmployeeRecord(data)
    })
    
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    
    return this
}

function hoursWorkedOnDate(targetDate){
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate)

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(date){
    let wage = hoursWorkedOnDate.call(this, date)
        * this.payPerHour
    
    return parseFloat(wage.toString())
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

function calculatePayroll(arrayEmpRec){
    return arrayEmpRec.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

