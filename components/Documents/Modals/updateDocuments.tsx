import React from "react";
import { useContext } from "react";
import DocumentsContext from "../../../context/DocumentContext/DocumentsContext";
import { clearDocumentsModal } from "../../../context/DocumentContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Documents.module.css'
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FILES, UPDATE_FILES, GET_FILE } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";

export const UpdateDocuments = () => {

    const {state, dispatch} = useContext(DocumentsContext)
    const [updateDocument] = useMutation(UPDATE_FILES, {
        refetchQueries:[{query:GET_ALL_FILES}, {query:GET_FILE, variables:{id:state._id}}],
    })
    const handleClose = ()=>{
        clearDocumentsModal({}, dispatch);
    }

    const { loading, error, data } =  useQuery(GET_FILE, {
        variables: {
                id: state._id,
            }
    });

    if(loading) return null
    const {documentType,maxWeight,name,obligatory} = data.GET_FILE
    const initialValues = () => {
        return {
            nombre: name,
            tipoDocumento: documentType,
            pesoMaximo:maxWeight,
            esObligatorio:obligatory
        }
    }
    return (
    <div>
    <Formik
      initialValues={initialValues()}
      validationSchema={validationSchema}
      onSubmit={formData => {
        const idDoc = Number(state._id) 
        updateDocument({
            variables:{
                updateFilesId:idDoc,
                input: {
                    name: formData.nombre,
                    documentType: formData.tipoDocumento,
                    maxWeight:formData.pesoMaximo.toString(),
                    obligatory:formData.esObligatorio                    
                },
            },
        }).then(()=>{
            SuccessfulAlert({text:"Documento actualizado con ??xito"});
        });
        handleClose();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
      }) => (
        <Dialog open={state.updateModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
            <div className={styles.dialogContainer}>
                <div className={styles.centerContainer}>
                    <h2 id="form-dialog-title" data-testid="TitleModal">Editar Documento</h2>
                </div>
                <DialogContent>
                <Form onSubmit = {handleSubmit}>
                    <TextField 
                        fullWidth 
                        className={styles.dialogFields} 
                        name="nombre" 
                        label="Nombre" 
                        variant="outlined" 
                        value = {values.nombre}
                        onChange={handleChange}
                        error={touched.nombre && Boolean(errors.nombre)}
                        helperText = {touched.nombre && errors.nombre}
                        size="small" />
                    <FormControl 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        error={touched.tipoDocumento && Boolean(errors.tipoDocumento)}
                        className={styles.dialogFields}>
                        <InputLabel >Tipo de documento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name = "tipoDocumento"
                            value = {values.tipoDocumento}
                            onChange={handleChange}
                        >
                            <MenuItem value="pdf">PDF</MenuItem>
                            <MenuItem value="jpg">Imagen(JPG)</MenuItem>
                            <MenuItem value="png">Imagen (PNG)</MenuItem>
                            <MenuItem value="gif">Imagen (GIF)</MenuItem>
                        </Select>
                        <FormHelperText>{touched.tipoDocumento && errors.tipoDocumento}</FormHelperText>
                    </FormControl>
                    <TextField 
                        fullWidth 
                        type="number"
                        label="Peso m??ximo" 
                        variant="outlined" 
                        size="small" 
                        name = "pesoMaximo"
                        value = {values.pesoMaximo}
                        onChange={handleChange}
                        error={touched.pesoMaximo && Boolean(errors.pesoMaximo)}
                        helperText = {touched.pesoMaximo && errors.pesoMaximo}
                        className={styles.dialogFields} />
                    <FormControlLabel 
                        control=
                        {
                            <Checkbox 
                                onChange={handleChange}
                                value = {values.esObligatorio}
                                checked = {values.esObligatorio ? true : false}
                                className = {styles.checkboxCustom}
                                name="esObligatorio" 
                                 />
                        } 
                        label="Es obligatorio"
                        className={styles.dialogFields}
                         />
                    <div className={styles.centerContainer}>
                        <Button className="buttonCancel" onClick={() => handleClose()}>
                                Cancelar
                        </Button>
                        <Button type="submit" className="buttonSave" style={{marginLeft: "20px"}}>
                            {'Agregar'} <SaveIcon />
                        </Button>
                    </div>
    
                    </Form>
                </DialogContent>
            </div>
        </Dialog>
      )}
    </Formik>
  </div>
    )
}

// @ts-ignore
const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    tipoDocumento:Yup.string().required("El tipo de documento es requerido"),
    pesoMaximo : Yup.number().required("El peso maximo es requerido").min(0, "Al menos debe ser 0").max(255,"Maximo es 255")

})
// @ts-ignore