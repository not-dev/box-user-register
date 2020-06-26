import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, styled, StylesProvider, Theme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Dropzone, Menu, Selector, Table } from '../contents'
import { theme } from '../theme'
import { asyncFunc, boxAddUser, boxGetClient } from '../utility'

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
  },
  backdrop: {
    zIndex: theme.zIndex.modal,
    color: theme.palette.common.white
  }
}))

type userJson = {
  username:string,
  email:string
}

const App:React.FC = () => {
  const classes = useStyles({ theme })

  const blankRecords:Array<Array<string>> = []

  const [records, setRecords] = React.useState(blankRecords)

  const [running, setRunning] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const [selector, setSelector] = React.useState<Selector>({
    skipFirst: true,
    username: 0,
    email: 1
  })

  const deleteAll = () => {
    setRecords(blankRecords)
  }

  const executeSync = () => {
    setRunning(true)
    const client = boxGetClient()
    const length = selector.skipFirst ? records.length - 1 : records.length
    const step = 100 / length
    records.slice(selector.skipFirst ? 1 : 0).forEach((row, i) => {
      const userJson:userJson = { username: row[selector.username], email: row[selector.email] }
      boxAddUser(client, userJson)
      setProgress(step * (i + 1))
    })
  }

  const execute = async () => {
    await asyncFunc(executeSync)
    setRunning(false)
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper className={classes.root}>
          <Wrapper className={classes.menu}>
            <Menu disabled={records.length === 0} deleteAll={deleteAll} execute={execute}/>
          </Wrapper>
          <Wrapper className={classes.dropzone}>
            {records.length !== 0
              ? <Table records={records} selector={selector} setSelector={setSelector}/>
              : <Dropzone setRecords={setRecords}/>
            }
          </Wrapper>
        </Wrapper>
        <Backdrop className={classes.backdrop} open={running}>
          <CircularProgress color='inherit' size={64} variant='static' value={progress}/>
        </Backdrop>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
