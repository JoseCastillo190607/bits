import { useState } from "react";
import { Dialog, DialogContent, Grid, Checkbox } from "@material-ui/core";


const AvisoPrivacidad =() =>{
  const[aviso, setAviso] = useState(true)

  const OpenWEB =()=>{
    window.open('https://www.it-seekers.com/aviso-de-privacidad/', 'Aviso de Privacidad')
  }

  const acepto =() =>{
    localStorage.setItem('UsuarioAcepta','Acepta')
    setAviso(false)

  }

  const handleClose = () =>{
    setAviso(true)
  } 

  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={aviso} fullWidth={true} onClose={handleClose}>
      <h2 id="form-dialog-title" className="text-center">Aviso de Privacidad</h2>
      <DialogContent>
        <Grid direction="column" container justify="center" alignItems="center">
          <Grid>
            <p>Para poder continuar con el proceso por favor acepta el Aviso de Privacidad</p>
          </Grid>
          <Grid item direction="row" container spacing={0} alignItems="center" justify="center">
            <Grid >
              <Checkbox onClick={acepto}/>
            </Grid>
            <Grid>
              <p>Acepto el <span onClick={OpenWEB} style={{color:"#F5BA02",textDecorationLine:"underline"}}>Aviso de Privacidad</span></p>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default AvisoPrivacidad;
