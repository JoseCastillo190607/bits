import { MouseEvent, useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';

import THeaderBits from './THeaderBits';
import { TBColumn, TBData, TBOrder, TBuseStyles } from '../../interfaces/TableBits.interfaces';

import './tableBits.css';

interface Props {
  className?: string,
  options?: boolean;
  children?: JSX.Element;
  rows: any[];
  columns: TBColumn[];
  components?: Array<any>;
  componentOptions?: any
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: TBOrder,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  // const withoutJSX = array.map(el => ({...el, component: ''}));
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableBits = ({
  className,
  options = true,
  rows = [],
  columns = [],
  components = [],
  componentOptions: ComponentOptions
}: Props) => {
  const classes = TBuseStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<TBOrder>('desc');
  const [orderBy, setOrderBy] = useState<keyof TBData>(columns[0].id); // ADAPTAR
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [newColumns, setNewColumns] = useState(columns);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (options) {

      let newData = columns;
      const existOptions = newData.find(col => col.type === 'options')

      if (!existOptions) {
        newData.push({
          id: "OptionsBITS",
          label: 'Opciones',
          align: 'right',
          type: 'options',
        })
      } else {
        const isOptions = (col: TBColumn) => col.type === 'options' ? { ...existOptions, ...col } : col;
        newData = columns.map(isOptions);
      };

      setNewColumns(newData);
    }

    setLoading(false);

  }, [columns, options]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof TBData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (loading) return <span>Cargando...</span>

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.paper} >
        <Table stickyHeader aria-label="sticky table">

          <THeaderBits
            columns={newColumns}
            classes={classes}
            // numSelected={selected.length}
            options={options}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>

            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    className="tableRow__BITS"
                  >
                    {newColumns.map((col, i) => {

                      // Render Cell options
                      if (i === newColumns.length - 1 && options) {

                        if (ComponentOptions) return (
                          <TableCell key={"OPTIONSBITS2"} align={'right'}>
                            <ComponentOptions {...row} />
                          </TableCell>
                        )

                        return (
                          <TableCell key={"OPTIONSBITS2"} align={'left'} >
                            <button onClick={() => console.log(row)}>{col.id}</button>
                          </TableCell>
                        );
                      };

                      // Check if components were sended
                      if (components.length > 0) {
                        // Check if component was declared
                        if (components[i]) {
                          return (
                            <TableCell key={col.id} align={'left'}>
                              {components[i](row)}
                            </TableCell>
                          )
                        };
                      };

                      const value: { [unit: string]: any } = row;

                      return (
                        <TableCell key={col.id} align={'left'}>
                          {value[col.id]}
                        </TableCell>
                      );

                    })}

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={"Número de filas"}
      />
    </Paper >
  )
}

export default TableBits;
