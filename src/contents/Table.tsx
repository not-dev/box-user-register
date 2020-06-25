import {
  FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, Select, Switch,
  Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow
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

type TProps = {
  records: Array<Array<string>>
  selector: {
    skipFirst: boolean,
    username: number,
    email: number
  }
  setSelector: (selector:TProps['selector']) => void
}

const Table:React.FC<TProps> = (props) => {
  const classes = useStyles()

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
            {[...Array(props.records[0].length)].map((_, i) => {
              return (
                <MenuItem value={i} key={`username-${i}`}>{i}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className={classes.selector}>
          <InputLabel>e-mail</InputLabel>
          <Select
            label='e-mail'
            value={props.selector.email}
            onChange={(e) => props.setSelector({ ...props.selector, email: Number(e.target.value) })}
          >
            {[...Array(props.records[0].length)].map((_, i) => {
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
              <TableCell>e-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.records.slice(props.selector.skipFirst ? 1 : 0).map((row) => (
              <TableRow key={row[props.selector.username]}>
                <TableCell>
                  {row[props.selector.username]}
                </TableCell>
                <TableCell>{row[props.selector.email]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </React.Fragment>
  )
}

export { Table }
