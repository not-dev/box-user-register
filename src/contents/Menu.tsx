import { Button, Typography } from '@material-ui/core'
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import React from 'react'

const ExButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}))

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center'
})

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flex: 1
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start'
  }
}))

type MProps = {
  disabled: boolean
}

const Menu:React.FC<MProps> = (props) => {
  const classes = useStyles()

  return (
    <Wrapper className={classes.root}>
      <Wrapper className={classes.title}>
        <Typography variant='h4' color='primary' style={{ fontFamily: 'comfortaa, sans-serif' }}>
          box User Register
        </Typography>
      </Wrapper>
      <Wrapper>
        <ExButton variant='contained' color='primary' disabled={props.disabled}>
        CREATE USERS
        </ExButton>
      </Wrapper>
    </Wrapper>
  )
}

export { Menu }
