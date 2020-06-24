import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core/'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme:Theme) => createStyles({
  table: {
    padding: theme.spacing(4)
  }
}))

type TProps = {
  userJsons: Array<{username:string, email:string}>
}

const Table:React.FC<TProps> = (props) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.table}>
      <MuiTable aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>username</TableCell>
            <TableCell>e-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.userJsons.map((row) => (
            <TableRow key={row.username}>
              <TableCell>
                {row.username}
              </TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export { Table }
