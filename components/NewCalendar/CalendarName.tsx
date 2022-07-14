

export default function CalendarName ({name}:any){
    let constBlankSpace = 0
    let nameWithSpace= ''
    let i2 = 0
    for(let i = 0; i<name.length; i++){
        //console.log('contador 2', i2, constBlankSpace, nameWithSpace)
        if(name[i] === " "){
            //constBlankSpace++
            i2 = 0

        }

        if(i2 === 15){
            
            
            //if(constBlankSpace == 0){
                nameWithSpace = nameWithSpace + " "
                nameWithSpace = nameWithSpace + name[i]
            //    constBlankSpace = 0
            //}else{
            //    nameWithSpace = nameWithSpace + name[i]
            //}

            i2 = 0
        }else{
            nameWithSpace = nameWithSpace + name[i]
            i2++
        }
        
    }


    return (
        <p
        style={{
            height:"85px"
        }}
        >{nameWithSpace}</p> 

    )

}