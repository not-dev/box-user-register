import {
  FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, Select, Switch,
  Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from '@material-ui/core/'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme:Theme) => createStyles({
  form: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  table: {
    padding: theme.spacing(4)
  },
  selector: {
    minWidth: 160,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}))

type Selector = {
  skipFirst: boolean,
  username: number,
  email: number
}

type TProps = {
  records: Array<Array<string>>
  selector: Selector
  setSelector: (selector:TProps['selector']) => void
}

const Table:React.FC<TProps> = (props) => {
  const classes = useStyles()

  const [records, setRecords] = React.useState(props.records)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage] = React.useState(10)
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  React.useEffect(() => {
    setRecords(props.records.slice(props.selector.skipFirst ? 1 : 0))
    setPage(0)
  }, [props.records, props.selector])

  return (
    <React.Fragment>
      <FormGroup row className={classes.form}>
        <FormControlLabel className={classes.selector}
          control={<Switch checked={props.selector.skipFirst} onChange={() => { props.setSelector({ ...props.selector, skipFirst: !props.selector.skipFirst }) }} />}
          label='Skip First Row'
        />
        <FormControl variant='outlined' className={classes.selector}>
          <InputLabel>username</InputLabel>
          <Select
            label='username'
            value={props.selector.username}
            onChange={(e) => props.setSelector({ ...props.selector, username: Number(e.target.value) })}
          >
            {[...Array(props.records[0]?.length)].map((_, i) => {
              return (
                <MenuItem value={i} key={`username-${i}`}>{i}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className={classes.selector}>
          <InputLabel>email</InputLabel>
          <Select
            label='email'
            value={props.selector.email}
            onChange={(e) => props.setSelector({ ...props.selector, email: Number(e.target.value) })}
          >
            {[...Array(props.records[0]?.length)].map((_, i) => {
              return (
                <MenuItem value={i} key={`email-${i}`}>{i}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </FormGroup>
      <TableContainer component={Paper} className={classes.table}>
        <MuiTable aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.slice(page * rowsPerPage,
              page * rowsPerPage + rowsPerPage).map((row, i) => {
              return (
                <TableRow key={`${page}-${i}`}>
                  <TableCell>
                    {row[props.selector.username]}
                  </TableCell>
                  <TableCell>
                    {row[props.selector.email]}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component='div'
        count={records.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
        page={page}
        onChangePage={handleChangePage}
      />
    </React.Fragment>
  )
}

export { Table }
export type { Selector }
