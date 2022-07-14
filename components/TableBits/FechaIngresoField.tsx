import React from 'react'
import { Collaborator } from '../../interfaces/TabCollaborator.interfaces';
import moment from 'moment';

const FechaIngresoField = ({FechaIngreso}: Collaborator) => {
    return (
        <div>
            <label>{moment(FechaIngreso).format('DD/MM/YYYY')}</label>
        </div>
    )
}

export default FechaIngresoField
