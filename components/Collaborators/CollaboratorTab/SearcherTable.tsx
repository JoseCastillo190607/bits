import { useContext } from 'react';
import {
    Box,
    Grid
} from '@material-ui/core';
import { styleCollaboratorTab as style } from './styleSheet';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {AdminContext} from '../../../context/AdminContext/AdminContext'

interface Props<T> {
    initState: Array<T>;
    setState: Dispatch<SetStateAction<T[]>> | ((a: T[]) => void);
    label?: string;
    fields?: Array<string>;
    width?: number
}

const SearcherTable = <T extends Object>({ initState, setState, label = "Buscar", fields = [], width = 320 }: Props<T>) => {

    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        let dataFiltered;

        setText(text);

        if (text === "") {
            dataFiltered = initState;

        } else {

            dataFiltered = initState.filter((e) => {
                const value: { [unit: string]: any } = e;
            
                let itemData = ``;

                if (fields.length > 0) {
                    fields.forEach((field) => {
                        if(value[field]){
                            itemData += `${value[field].toUpperCase()} `;
                        }
                    });
                } else {
                    const fieldsElement = Object.keys(e);
                    fieldsElement.forEach((field) => {
                        if(value[field]){
                            itemData += `${value[field].toUpperCase()} `;
                        }
                    });
                }
                
                let Prueba;
                Prueba = itemData.includes('STAFF')
                return itemData.indexOf(text.toUpperCase()) > -1;
            });
        }
        setState([...dataFiltered]);

    };

    return (
        <Grid item>
            <Box >

                <Grid
                    container
                    direction="row"
                    style={{...style.containerSearcher, width: width}}
                >

                    <Grid item >
                        <input
                            style={{...style.inputSearcher, width: (width - 80)}}
                            className="collaboratorTab__searcher"
                            placeholder={label}
                            value={text}
                            onChange={(e) => handleChange(e)}

                        />
                    </Grid>

                    <Grid item style={{
                        width: "17px",
                        padding: "0 4px 0 0",
                    }}>
                        <img
                            src="/assets/icons/icono-buscar.svg"
                            alt="Buscar"
                        />
                    </Grid>

                </Grid>
            </Box>
        </Grid>

    )
};

export default SearcherTable
