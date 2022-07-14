import { createStyles, makeStyles, TableCellProps } from "@material-ui/core";
import { Theme } from '@material-ui/core/styles';
import { MouseEvent } from "react";
import { Collaborator } from "./TabCollaborator.interfaces";

export const TBuseStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
            maxHeight: 440,
            minHeight: 440
        },

        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
            backgroundColor: "red"
        },
    }),
);

export const TBuseStylesTable = makeStyles({
    root: {
        color: "red",
        padding: '10px'
    },
    label: {
        textTransform: 'capitalize',
    },
    table: {
        cursor: "pointer",
        borderLeft: "8px solid #9a031e",
        marginTop: "8px"
    },
});


export type TBOrder = 'asc' | 'desc';

export interface TBColumn {
    id: any //keyof TBData | "OptionsBITS";
    label: string;
    minWidth?: number;
    align?: TableCellProps["align"];

    type?: string
    show?: boolean;
    disablePadding?: boolean;
    format?: (value: number) => string;
}

export interface TBHederProps {
    columns: Array<TBColumn>,
    options?: boolean,

    classes: ReturnType<typeof TBuseStyles>;
    // numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof TBData) => void;
    order: TBOrder;
    orderBy: string;
};

/* interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  } */

export type TBData =
    | Collaborator;

export interface TabCollaborator {
    _id:          string;
    Proyecto:     string;
    Sede:         string;
    Cliente:      string;
    Usuario:      string;
    FechaIngreso: string;
    Puesto?:      string;
    FullName:     string;
    // component?:   ElementType
}