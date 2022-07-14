import {Box, Grid} from '@material-ui/core'
import BaseAccordion from './BaseAccordion';

const ColumnaPermisos = () =>{
  
  
  
  return(
    <Grid xs item className='permisos_Container'>
      <Box>
        <p className='titulo_Permisos'>Permisos</p>
        <div className='titulos_tablaPermisos'>
          <p>Dashboard</p>
          <p>Permisos</p>
        </div>
      </Box>
      <Box>
        <BaseAccordion />
      </Box>
    </Grid>
  )
}

export default ColumnaPermisos;