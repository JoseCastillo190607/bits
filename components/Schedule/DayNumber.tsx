export default function dayNumber(value: any){
    let day = value.format("D").toString()

    if (day.length === 1){
        day = "0"+day
    }
    return day
}
