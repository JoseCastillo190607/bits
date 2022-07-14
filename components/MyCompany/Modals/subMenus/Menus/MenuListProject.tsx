import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmpresaContext from "../../../../../context/Empresa/EmpresaContext";
import { opendDeleteProjectModal, openDeleteSedeModal, openUpdateProject } from "../../../../../context/Empresa/Actions";


const MenuListaProyectos = (props:any) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const { dispatch } = useContext(EmpresaContext); 

  const abreEditaProyecto = ()=>{
    console.log('id', props.i)
    console.log('nombre', props.nombre)
    console.log('cliente', props.cliente)

    openUpdateProject({updateProject: true, _id:props.id, nombreProject: props.nombre, clienteProject: props.cliente}, dispatch)
  }

  const abreEliminaSede = ()=>{
    opendDeleteProjectModal({deleteSede: true, _id:props.id}, dispatch)
  }

  return( 
    <>
      <Tooltip title="Editar" placement="right">
        <Box className="IconButtonPoints" mr={2}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon style={{ color: "#fabb00" }} />
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        className="MoreVerIcon"
        anchorEl={anchorEl}
        open={open}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem divider button onClick={() => abreEditaProyecto()}>
          Editar&nbsp;
          <Grid container item justify="flex-end">
            <img src={`/assets/svg/icono-editar.svg`} alt="Reenviar" />
          </Grid>
        </MenuItem>
        <MenuItem divider button onClick={() =>abreEliminaSede()}>
          Eliminar&nbsp;
          <Grid container item justify="flex-end">
            <img src={`/assets/svg/icono-eliminar.svg`} alt="Reenviar" />
          </Grid>
        </MenuItem>
        </Menu >
    </>
  )
}

export default MenuListaProyectos