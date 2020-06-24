import { Button } from '@material-ui/core'
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import React from 'react'

const ExButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}))

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    backgroundColor: '#333',
    padding: theme.spacing(1),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}))

const Menu:React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ExButton variant='contained' color='primary'>
        Create Users
      </ExButton>
    </div>
  )
}

export { Menu }
