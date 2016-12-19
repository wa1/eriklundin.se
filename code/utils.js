module.exports = {
    getCurrentTick: function() { 
        // getCurrentTick returns a the number of ticks (number of 10000ms) 
        // since 0001/01/01 00:00, equivalent to C#: DateTime.Now.Ticks
        var t = new Date();
        var year = t.getUTCFullYear();
        var month = t.getUTCMonth();
        var dayOfMonth = t.getUTCDate();
        var hour = t.getUTCHours();
        var minute = t.getUTCMinutes();
        var second = t.getUTCSeconds();
        var dayOffsetPerMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
        var dayOffsetPerMonthLeap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
        var isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0); // leapyear if the year is divisible by 400 or (divisible by 4 but not 100)
        var y = year - 1;
        var dayMap = isLeapYear ? dayOffsetPerMonthLeap : dayOffsetPerMonth;
        var days = y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + dayMap[month] + dayOfMonth - 1;
        var seconds = days * 86400 + (hour * 3600 + minute * 60 + second); // 86400 = 24 * 3600, seconds in a day
        var tickStr = seconds + "0000000"; // 1 tick is 10000 ms, so 1000 * 10000 = 10000000 s => add seven 0's
        var currentTick = tickStr;
        return currentTick;
    }
};
