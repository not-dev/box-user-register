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

  const [selector, setSelector] = React.useState({
    skipFirst: true, username: 0, email: 1
  })

  const deleteAll = () => {
    setUserJsons(blankUserJsons)
    setRecords(blankRecords)
  }

  React.useEffect(() => {
    const userJsons = records.slice(selector.skipFirst ? 1 : 0).map((row) => {
      return (
        { username: row[selector.username], email: row[selector.email] }
      )
    })
    setUserJsons(userJsons)
  }, [records, selector.email, selector.skipFirst, selector.username, setUserJsons])

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper className={classes.root}>
          <Wrapper className={classes.menu}>
            <Menu disabled={userJsons.length === 0} deleteAll={deleteAll}/>
          </Wrapper>
          <Wrapper className={classes.dropzone}>
            {records.length !== 0
              ? <Table records={records} selector={selector} setSelector={setSelector}/>
              : <Dropzone setRecords={setRecords}/>
            }
          </Wrapper>
        </Wrapper>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
