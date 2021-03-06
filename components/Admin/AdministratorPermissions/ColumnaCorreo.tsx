import { useContext, createRef} from 'react'
import { useHistory, useParams } from "react-router-dom";
import AdminPermisosContext from '../../../context/AdminContext/AdminPermisosContext/AdminPermisosContext';
import {putAdmin } from '../../../services/adminService';
import ListaProyectos from './ListaProyectos';
import {Box, Button, Grid, TextField} from '@material-ui/core'
import ArrowBackIcon from 'material-ui'
import SaveIcon from 'material-ui'


const ColumnaCorreo = (props: any) =>{

  const {id,tab} = useParams<any>();
  const {state} = useContext(AdminPermisosContext)
  const history = useHistory();
  const text = createRef<any>();
  let DatosConvertidos = []
  
  if(state.Permisos.Proyectos.Proyectos !== undefined){
    DatosConvertidos = state.Permisos.Proyectos.Proyectos.split(',')
  }else{
    DatosConvertidos.push('Sin Proyectos asignados')
  }
 
  const updateAdmin =  async (admin:string): Promise<void> =>{
    if (admin) {

      await putAdmin(tab, admin);
    }else 
      await alert('Correo no es valido')
  }

  const onBack= () =>{
    localStorage.setItem('currentPill','4');
    history.push(props.back)
}

  return (
    <>
      <Grid xs item>
        <Grid direction="row" container justify="flex-start" alignItems='center'>
          <Box ml={2} mt={5} pt={1}>
            <ArrowBackIcon fontSize="small" style={{color: "#fabb00"}} />
          </Box>
          <span className='Return' onClick={onBack}>Regresar</span>
        </Grid>
      </Grid>
      <Grid xs item>
        <Box ml={6}>
          <h3 className='titulo_informacion'>Información</h3>
          <p className='correo_label'>Correo</p>
          <Box className="correo flex">
            <TextField 
              className="correo"
              margin="dense"
              type="text"
              placeholder={id}
              defaultValue={id}
              required
              inputRef={text}
            >   
            </TextField>
            <Button type="submit" className="buttonSave correoButton"  onClick={() => updateAdmin(text.current.value)} >
              <SaveIcon />
            </Button>
          </Box>
            <p className='subtitulo_informacion'>Proyectos asignados</p>
        </Box>                            
      </Grid>
      <Grid>
        <Box ml={6}>
          <ListaProyectos Proyectos={DatosConvertidos}/>
        
        </Box>                               
      </Grid>
    </>
    )

}

export default ColumnaCorreo