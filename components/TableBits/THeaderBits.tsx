import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TBColumn, TBData, TBHederProps } from '../../interfaces/TableBits.interfaces';
import { MouseEvent } from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { createStyles, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#f5f6f9',
      color: '#222222',
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: 'bold',
      height: "25px"
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const THeaderBits = ({
  columns,
  options,
  classes,
  order,
  orderBy,
  onRequestSort
}: TBHederProps) => {

  const createSortHandler = (property: keyof TBData) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const renderOptions = (headCell: TBColumn) => {

    if (headCell.type === "options") {
      return headCell.label
    }

    return (
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    )
  }

  return (
    <TableHead>
      <TableRow>
        {columns.length > 0 &&
          columns.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
              className="tableHeader__BITS"
            >
              {renderOptions(headCell)}
            </StyledTableCell>

          ))
        }

      </TableRow>
    </TableHead>
  )
}

export default THeaderBits;
