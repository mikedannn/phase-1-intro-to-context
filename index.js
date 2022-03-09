function createEmployeeRecord(employeeArray) {
    let employeeObject = {
        firstName: employeeArray[0], 
        familyName: employeeArray[1], 
        title: employeeArray[2], 
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObject;
}

function createEmployeeRecords(employeesArray) {
    let newEmployeesArray = [];

    for (const employeeArray of employeesArray) {
        const employeeObject = createEmployeeRecord(employeeArray);
        newEmployeesArray.push(employeeObject);
    }
    return newEmployeesArray;
}

function createTimeInEvent(employeeObject, dateStamp) {
    let timeInObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 15), 10),
        date: dateStamp.slice(0, 10),
    }
    employeeObject.timeInEvents.push(timeInObject);
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
    let timeOutObject = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 15), 10),
        date: dateStamp.slice(0, 10),
    }
    employeeObject.timeOutEvents.push(timeOutObject);
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, dateStamp) {
    let timeOut = 0;
    let timeIn = 0;
    
    for(const timeInEvent of employeeObject.timeInEvents) {
        if(timeInEvent.date === dateStamp){
            timeIn = timeInEvent.hour;
            break;
        } 
    } 
    
    for(const timeOutEvent of employeeObject.timeOutEvents) {
        console.log(timeOutEvent.date);
        if(timeOutEvent.date === dateStamp){
            timeOut = timeOutEvent.hour;
            break;
        }
        
    }

    const hoursWorked = (timeOut - timeIn) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObject, dateStamp) {
    const payRate = employeeObject.payPerHour;
    const hoursWorked = hoursWorkedOnDate(employeeObject, dateStamp);

    return payRate * hoursWorked;

}

function getDatesWorked(employeeObject) {
    let datesWorked = [];

    for(const timeInEvent of employeeObject.timeInEvents){
        datesWorked.push(timeInEvent.date);
    }
    return datesWorked;
}


function allWagesFor(employeeObject) {
    let totalWages = 0;
    const datesWorkedArray = getDatesWorked(employeeObject);
    
    for(const date of datesWorkedArray){
        totalWages += wagesEarnedOnDate(employeeObject, date);
    }
    return totalWages;
}

function calculatePayroll(employeeRecordsArray) {
    let totalPay = 0;

    for(const employee of employeeRecordsArray){
        totalPay += allWagesFor(employee);
    }
    return totalPay;
}