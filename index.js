function createEmployeeRecord(employee) {
    return {
        firstName:employee[0],
        familyName:employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employees) {
   return employees.map(employee =>createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let eventObj = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10),
    }

    employee.timeInEvents.push(eventObj)
    return employee
    }

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let eventObj = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    }

    employee.timeOutEvents.push(eventObj)
    return employee
}
 
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event=>event.date===date)
    const timeOut = employee.timeOutEvents.find(event=>event.date===date)

    return (timeOut.hour-timeIn.hour)/100
} 

function wagesEarnedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event=>event.date===date)
    const timeOut = employee.timeOutEvents.find(event=>event.date===date)
    const hours = (timeOut.hour-timeIn.hour)/100
    let pay = employee.payPerHour

    return hours * pay
}

const allWagesFor = function (){
   const eligibleDates = this.timeInEvents.map(function(e) {
    return e.date
   })
   const payable  = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate.call(this, d)
   }.bind(this), 0)

   return payable

   }

function calculatePayroll(employeeRecords) {
const record = employeeRecords.map(employee=> allWagesFor.call(employee))
return record.reduce((currentValue, total) => currentValue + total)
}

