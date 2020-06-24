import { CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, styled, StylesProvider, Theme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Dropzone, Menu, Table } from '../contents'
import { theme } from '../theme'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    padding: theme.spacing(5),
    overflowX: 'hidden'
  },
  menu: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  },
  dropzone: {
    flex: 1
  }
}))

const App:React.FC = () => {
  const classes = useStyles({ theme })
  const blankRecords:Array<Array<string>> = []
  const blankUserJsons:Array<{username:string, email:string}> = []
  const [records, setRecords] = React.useState(blankRecords)
  const [userJsons, setUserJsons] = React.useState(blankUserJsons)

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper className={classes.root}>
          <Wrapper className={classes.menu}>
            <Menu records={records} setUserJsons={setUserJsons}/>
          </Wrapper>
          <Wrapper className={classes.dropzone}>
            {records.length !== 0
              ? <Table userJsons={userJsons}/>
              : <Dropzone setRecords={setRecords}/>
            }
          </Wrapper>
        </Wrapper>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
