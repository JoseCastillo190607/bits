import style from "../../screens/BitsScreen.module.css";

const  CircularProgressBar = ({ strokeWidth = 0, percentage = 0, numberday = 0  }) => {
   
    const radius = (50 - strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
			stroke: '#005CE5',
  	
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - percentage) / 100 * diameter)}px`,
    };

    return (
      <svg id="progressbarcircle"
        className={style.CircularProgressbar}
        viewBox="0 0 100 100"
				width={100}
				height={100}
      >
        <path
          className="CircularProgressbar-trail"
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
					style={{
						stroke: 'rgba(54, 126, 234, 0.5)',
					}}
        />

        <path
          className="CircularProgressbar-path"
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={progressStyle}
        />

        <text
          className="CircularProgressbar-text"
          x={50}
          y={50}
					style={{
					fill: '#FFFFFF',
  					fontSize: '24px',
  					dominantBaseline: 'central',
  					textAnchor: 'middle',
                    stroke: '1px'
					}}
        >
          {`${numberday}`}
        </text>
      </svg>
    );
};

export default CircularProgressBar;