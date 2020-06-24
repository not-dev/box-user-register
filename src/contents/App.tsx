import { CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, styled, StylesProvider, Theme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Dropzone, Menu } from '../contents'
import { theme } from '../theme'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ccc',
    padding: theme.spacing(5)
  },
  menu: {
    backgroundColor: '#0000ff',
    height: 240
  },
  dropzone: {
    backgroundColor: '#00ff00',
    flex: 1
  }
}))

const App:React.FC = () => {
  const classes = useStyles({ theme })

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper className={classes.root}>
          <Wrapper className={classes.menu}>
            <Menu/>
          </Wrapper>
          <Wrapper className={classes.dropzone}>
            <Dropzone/>
          </Wrapper>
        </Wrapper>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
