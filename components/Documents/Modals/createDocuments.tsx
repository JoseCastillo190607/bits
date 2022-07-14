import { useContext, useState } from "react";
import DocumentsContext from "../../../context/DocumentContext/DocumentsContext";
import { clearDocumentsModal } from "../../../context/DocumentContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { Form} from "semantic-ui-react";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Documents.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { GET_ALL_FILES, CREATE_FILES } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";


interface IAddDocumentsModal{
    addFunc?: any;
}

export const CreateDocuments = () => {
    const {state, dispatch} = useContext(DocumentsContext)
    const [createNewDocument] = useMutation(CREATE_FILES, {
        refetchQueries:[{query:GET_ALL_FILES}],
    })
    const handleClose = ()=>{
      clearDocumentsModal({}, dispatch);
    }

    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:(formData) => {
            createNewDocument({
                variables:{
                    input: {
                        name: formData.nombre,
                        documentType: formData.tipoDocumento,
                        maxWeight:formData.pesoMaximo.toString(),
                        obligatory:formData.esObligatorio                    
                    },
                },
            }).then(()=>{
                SuccessfulAlert({text:"Documento creado con éxito"});
            });

            handleClose();
        },
    });

    
  return(
    <Dialog open={state.createModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <div className={styles.dialogContainer}>
            <div className={styles.centerContainer}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Agregar Documento</h2>
            </div>
            <DialogContent>
            <Form onSubmit = {formik.handleSubmit}>
                <TextField 
                    fullWidth 
                    className={styles.dialogFields} 
                    name="nombre" 
                    label="Nombre" 
                    variant="outlined" 
                    value = {formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText = {formik.touched.nombre && formik.errors.nombre}
                    size="small" />
                <FormControl 
                    fullWidth 
                    size="small"
                    variant="outlined" 
                    className={styles.dialogFields} 
                    error={formik.touched.tipoDocumento && Boolean(formik.errors.tipoDocumento)}
                >
                    <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name = "tipoDocumento"
                        value = {formik.values.tipoDocumento}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="jpg">Imagen(JPG)</MenuItem>
                        <MenuItem value="png">Imagen (PNG)</MenuItem>
                        <MenuItem value="gif">Imagen (GIF)</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.tipoDocumento && formik.errors.tipoDocumento}</FormHelperText>
                </FormControl>
                <TextField 
                    fullWidth 
                    type="number"
                    label="Peso máximo" 
                    variant="outlined" 
                    size="small" 
                    name = "pesoMaximo"
                    value = {formik.values.pesoMaximo}
                    onChange={formik.handleChange}
                    error={formik.touched.pesoMaximo && Boolean(formik.errors.pesoMaximo)}
                    helperText = {formik.touched.pesoMaximo && formik.errors.pesoMaximo}
                    className={styles.dialogFields} />
                <FormControlLabel 
                    control=
                    {
                        <Checkbox 
                            onChange={formik.handleChange}
                            value = {formik.values.esObligatorio}
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
                        + Agregar
                    </Button>
                </div>

                </Form>
            </DialogContent>
        </div>
    </Dialog>
  )
}


const initialValues = () => {
    return {
        nombre: "",
        tipoDocumento: "",
        pesoMaximo:255,
        esObligatorio:false
    }
}

// @ts-ignore
const validationSchema = () => {
    return {
        nombre: Yup.string().required("El nombre es requerido"),
        tipoDocumento:Yup.string().required("El tipo de documento es requerido"),
        pesoMaximo : Yup.number().required("El peso maximo es requerido").min(0, "Al menos debe ser 0").max(255,"Maximo es 255")
    }
}
// @ts-ignore

