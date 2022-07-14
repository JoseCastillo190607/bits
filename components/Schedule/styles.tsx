function beforeToday(day: any, dayOfMonth: any){
    return day.isBefore(dayOfMonth, "day")
}

function afterToday(day: any, endDayOfMonth: any){
    return day.isAfter(endDayOfMonth, "day")
}

function isToday(day: any){
    return day.isSame(new Date(), "day")
}

export default function dayStyles(day: any, value: any, dayOfMonth: any, endDayOfMonth: any){
    if (beforeToday(day, dayOfMonth)) return "notInMonth"
    if (afterToday(day, endDayOfMonth)) return "notInMonth"
    if (isToday(day)) return "today"
    return "aDayOfMonth"
}