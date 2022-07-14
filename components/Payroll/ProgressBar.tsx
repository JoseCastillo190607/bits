import { useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from "../../components/Payroll/PayrollStyles.module.css";



const ProgressBar = (props:any) =>{
  let {valor} = props

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 2.53,
    borderRadius: 1,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
          <div className={styles.pb_titulo}>
            Pagando n&oacute;mina, este proceso puede tomar hasta 30 minutos
          </div>
          <BorderLinearProgress variant="determinate" value={valor} />
      </Box>
    </>
  );
}

export default ProgressBar 