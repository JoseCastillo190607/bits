function isSelected(day: any, value: any){
    return value.isSame(day, "day")
}

export default function dayStyles(day: any, value: any){
    if (isSelected(day, value)) return "daySelected"
    return "dayBox"
}