import styles from './PayrollStyles.module.css'
interface TabDate {
    children?: React.ReactNode;
    date: any;
};

function DateTextNonWorkingDayModal(props: TabDate){

    const {date} =props

    return <div >
        {
            date.map((home: any) => {
                <div id="hora">
                <span 
                className={styles.textoFecha}
                >{new Date(home.startDate).toLocaleDateString()} - {new Date(home.endDate).toLocaleDateString()}
                </span>
                </div>
            })

            
        }

    </div>
        

}

export default DateTextNonWorkingDayModal