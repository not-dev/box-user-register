import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, styled, StylesProvider, Theme, ThemeProvider } from '@material-ui/core/styles'
import { validate } from 'email-validator'
import fileDownload from 'js-file-download'
import React from 'react'

import { Done, Dropzone, Menu, Selector, Table } from '../contents'
import { theme } from '../theme'
import { boxAddUser, boxGetClient, sleep } from '../utility'

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

type logJson = {
  success:Array<{
    [key:string]: string
  }>,
  error:Array<{
    [key:string]: string
  }>
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

  const [status, setStatus] = React.useState<string|boolean>(false)
  const [log, setLog] = React.useState<logJson>({ success: [], error: [] })

  const deleteAll = () => {
    setRecords(blankRecords)
  }

  const execute = async () => {
    setRunning(true)
    const length = selector.skipFirst ? records.length - 1 : records.length
    let failed = 0
    let step = 0
    const _log: logJson = { success: [], error: [] }
    const client = await boxGetClient().catch((err) => {
      _log.error.push({ status: err.toString() })
    })
    await records.slice(selector.skipFirst ? 1 : 0).reduce((acc, cur) => {
      const promise = async (row:Array<string>) => {
        const userJson:userJson = { username: row[selector.username], email: row[selector.email] }
        console.log(`run-${userJson.username}`)
        if (validate(userJson.email)) {
          const res = await boxAddUser(client, userJson).catch((err) => {
            failed++
            _log.error.push({ ...userJson, status: err.toString() })
          })
          _log.success.push({ ...userJson, status: res.toString() })
          console.log(`done-${userJson.username}`)
        } else {
          console.log(`Invalid email-${userJson.username}`)
          failed++
          _log.error.push({ ...userJson, status: 'Invalid email' })
        }
        await sleep(0.06) // Box api limit: 1000call / min -> 0.06sec / call
        step++
        setProgress(step / length * 100)
      }
      return acc.then(() => promise(cur))
    }, Promise.resolve())
    console.log('done')
    setRunning(false)
    setLog(_log)
    setStatus(`${length - failed} / ${length}`)
  }

  const download = () => {
    fileDownload(JSON.stringify(log, null, 2), 'box-user-register.log')
    console.log(log)
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {status
          ? <Done status={status} action={download}/>
          : <Wrapper className={classes.root}>
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
        }
        <Backdrop className={classes.backdrop} open={running}>
          <CircularProgress color='inherit' size={64} variant='static' value={progress}/>
        </Backdrop>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { App }
