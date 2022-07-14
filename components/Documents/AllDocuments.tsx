import { style } from '@mui/system';
import { useContext, useEffect, useState } from 'react'
import {createDocumentsModal} from '../../context/DocumentContext/Actions'
import DocumentsContext from '../../context/DocumentContext/DocumentsContext';
import styles from './Documents.module.css'
import { CreateDocuments } from './Modals/createDocuments';
import {UpdateDocuments} from './Modals/updateDocuments';
import {DeleteDocuments} from './Modals/deleteDocuments';
import { useQuery } from "@apollo/client";
import { GET_ALL_FILES } from "../../Querys/querys";
import {Documents} from './Documents' 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface ITabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  };
  
export const AllDocuments = (props: ITabPanelProps) => {
    const {state,dispatch} = useContext(DocumentsContext)
    const colName = ["Nombre","Tipo","Peso máximo","Obligatorio","Opciones"]
    const createModal = (id:string, createModal:boolean) => {
        createDocumentsModal({id, createModal},dispatch)
        
    }
    const resultDocument = useQuery(GET_ALL_FILES);
    const allDocument = resultDocument.data?.GET_ALL_FILES
    const activos = allDocument?.map((doct:any) => doct.status);
    const result = [activos?.filter((status:any) => status.length === 6)];
    return (
        <div className = {styles.contenedorPrincipal}>
            <div className = {styles.flex}>
                <div className={styles.textoTitulo}>
                    Configuración de documentos / Expediente
                </div>
                <div>
                    <button
                    className={`${styles.botonAgregar} ${styles.flex}`}
                        onClick={() => createModal('1', true)}
                    >
                        <span className={styles.textoBoton}> + Agregar nuevo documento</span>
                    </button>
                </div>
            </div>
            <TableContainer className = {styles.contenedorTabla}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className = {styles.contenedorTituloTabla}>
                        <TableRow>
                            {colName.map(col => (
                                col != "Opciones"? <TableCell className={styles.columnTablaText} align="left"><span>{col}</span></TableCell> : <TableCell className={styles.columnTablaText} align="right"><span>{col}</span></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result?.length >= 1 ? (
                            allDocument?.map((doct:any) => {
                                return (
                                    doct.status === "Activo" &&
                                    <Documents
                                        id = {doct.id}
                                        name = {doct.name}
                                        documentType = {doct.documentType}
                                        maxWeight = {doct.maxWeight}
                                        obligatory = {doct.obligatory}
                                    />
                                )
                            })
                        ):(
                            <li className = {`${styles.filaContenidoTabla} ${styles.flex}`}>
                                <span>No tienes documentos para tu compañía</span>
                            </li>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div className={styles.contenedorTabla}>
                <div className={`${styles.contenedorTituloTabla} ${styles.flex}`}>
                {colName.map(name => (  
                    <div className={styles.columnaTabla}>  
                        <span>{name}</span>  
                    </div>  
                    ))} 
                </div>
                <ul>
                    {result?.length >= 1 ? (
                        allDocument?.map((doct:any) => {
                            return (
                                doct.status === "Activo" &&
                                <Documents
                                    id = {doct.id}
                                    name = {doct.name}
                                    documentType = {doct.documentType}
                                    maxWeight = {doct.maxWeight}
                                    obligatory = {doct.obligatory}
                                />
                            )
                        })
                    ):(
                        <li className = {`${styles.filaContenidoTabla} ${styles.flex}`}>
                            <span>No tienes documentos para tu compañía</span>
                        </li>
                    )}
                </ul>
            </div> */}
            {state.updateModal ? <UpdateDocuments/>: null}
            {state.deleteModal ? <DeleteDocuments/>: null}
            {state.createModal ? <CreateDocuments/>: null}
        </div>

    )
}