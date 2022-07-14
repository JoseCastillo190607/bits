import { useContext } from "react";
import { Box, Dialog, DialogContent, DialogTitle, Grid, Button } from "@material-ui/core";
import { NewsContext, Types } from "../../../context/NewContext/NewContext";

const WatchNew = () => {
    const { state, dispatch } = useContext(NewsContext);
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={state.showModal} fullWidth={true} maxWidth="sm" >
            <DialogTitle id="customized-dialog-title" style={{padding: "0"}}>
                <h3 className="Nombre-de-la-Noticia">Nombre de la noticia</h3>
                <h2 id="form-dialog-title" className="text-center">{state.titulo}</h2>
            </DialogTitle>

            <DialogContent dividers>
                <Box display="flex" flexDirection="column">
                    <Grid direction="row" container justify="center" >
                        <Grid item xs={12} sm={6}>
                            <div className="imageNotice">
                                {
                                    state.ImageUri && (<img src={state.ImageUri} alt="Noticia Imagen" width="50%" height="50%" />)
                                }
                            </div>
                        </Grid>

                        <Grid container alignItems="flex-start" direction="column">
                            <div className="AutorNotice">
                                {state.Autor}
                                
                            </div>
                            <div className="contenido"><span dangerouslySetInnerHTML={{ __html: state.BodyHTML }}></span></div>
                            
                            <Button className="buttonCancel botoncito" onClick={() => dispatch({ type: Types.CLOSE_MODAL })}>
                                Cerrar
                                </Button>
                            
                                
                        </Grid>
                        
                    </Grid>
                    {/* <Grid direction="row" container justify="center" alignItems="center"> */}
                        {/* <Grid item xs>
                            <div className="AutorNotice">
                                {state.Autor}
                                
                            </div>
                            
                        </Grid> */}
                    {/* </Grid> */}
                </Box>
            </DialogContent>
            {/* <MuiDialogActions>
                <Button className="buttonCancel" onClick={() => dispatch({ type: Types.CLOSE_MODAL })}>
                    Cerrar
                </Button>
            </MuiDialogActions> */}
        </Dialog>
    )
}

export default WatchNew;