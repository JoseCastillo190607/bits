import React from "react";
import styles from './Documents.module.css'
import { MenuDocuments } from "./MenuListDocuments";
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
export const Documents = ({id, name, documentType, maxWeight, obligatory}:any) => {

    return(
        <TableRow
            key={id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left" className={styles.columnTablaTextContent}><span>{name}</span></TableCell>
            <TableCell align="left" className={styles.columnTablaTextContent}><span>{documentType}</span></TableCell>
            <TableCell align="left" className={styles.columnTablaTextContent}><span>{maxWeight}</span></TableCell>
            <TableCell align="left" className={styles.columnTablaTextContent}><span>{obligatory ? "Sí" : "No" }</span></TableCell>
            <TableCell align="right" className={styles.columnTablaTextContent}><MenuDocuments _id={id}/></TableCell>
        </TableRow>
        
        // <li className = {`${styles.filaContenidoTabla} ${styles.flex}`}>
        //     <div className = {styles.columnaTabla}>
        //         <span>{name}</span>
        //     </div>
        //     <div className = {styles.columnaTabla}>
        //         <span>{documentType}</span>
        //     </div>
        //     <div className = {styles.columnaTabla}>
        //         <span>{maxWeight}</span>
        //     </div>
        //     <div className = {styles.columnaTabla}>
        //     {obligatory ? <span>Sí</span>: <span>No</span>}
        //     </div>
        //     <div className = {styles.columnaTabla}>
        //         <MenuDocuments _id={id}/>
        //     </div>
        // </li>
    )
}