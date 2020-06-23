import { CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, styled, StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Dropzone } from '../contents'
import { theme } from '../theme'

const Wrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

const useStyles = makeStyles(() => createStyles({

}))

const App:React.FC = (props) => {
  const classes = useStyles({ theme })
  console.log(props, classes)

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Dropzone/>
        </Wrapper>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
