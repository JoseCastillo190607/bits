import { useEffect, useState } from "react";
import style from "../../screens/BitsScreen.module.css";


const Progress = ({done}: any) => {
	const [styles, setStyle] = useState({});
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	return (
		<div className={style.progress}>
			<div className={style.progressdone} style={styles}>
			
			</div>
		</div>
	)
}


export default Progress;