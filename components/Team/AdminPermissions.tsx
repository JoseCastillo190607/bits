import react,{useState} from "react"
import {
  Button, 
  Dialog, 
  DialogContent,
  Grid, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  Box,
  DialogTitle} from "@material-ui/core" 

const AdminPermissions = () =>{
  const [admin, setAdmin] = useState(true)

  const handleClose=()=>{
    setAdmin(false)
  }

  const styles = {
    principal:{
      height:"100%"
    }
  }

  return(
    <Dialog 
      open={admin} 
      onClose={handleClose}
      fullWidth={true} maxWidth="md"
      >
      <DialogTitle>
        <h2 id="form-dialog-title" className="text-center">Permisos por administrador</h2>
      </DialogTitle>

      <Grid container>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column">
            <Box mt={1}>
              <h3>Filtro y titulo</h3>
            </Box>
            <Box mt={2}>
              <h3>Lista de administradores</h3>
            </Box>
            <Box mt={6}>
              <h3>Menus Principales</h3>
            </Box>
            <Box mt={6}>
              <h3>Opciones Principale</h3>
            </Box>
          </Box>   
        </Grid>
      </Grid>
      
    </Dialog>
  )
}
export default AdminPermissions