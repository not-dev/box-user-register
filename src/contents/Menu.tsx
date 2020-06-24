import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, Typography } from '@material-ui/core'
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
  },
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

type MProps = {
  records: Array<Array<string>>
  setUserJsons: (userList: Array<{username:string, email:string}>) => void
}

const Menu:React.FC<MProps> = (props) => {
  const classes = useStyles()
  const records = props.records
  const setUserJsons = props.setUserJsons
  const [skipFirst, setSkipFirst] = React.useState(true)
  const [username, setUsername] = React.useState(0)
  const [email, setEmail] = React.useState(1)

  React.useEffect(() => {
    const userJsons = records.slice(skipFirst ? 1 : 0).map((row) => {
      return (
        { username: row[username], email: row[email] }
      )
    })
    setUserJsons(userJsons)
  }, [email, records, setUserJsons, skipFirst, username])

  return (
    <React.Fragment>
      <Wrapper className={classes.root}>
        <Wrapper className={classes.title}>
          <Typography variant='h4' color='primary' style={{ fontFamily: 'comfortaa, sans-serif' }}>
          box User Register
          </Typography>
        </Wrapper>
        <Wrapper>
          <ExButton variant='contained' color='primary' disabled={props.records.length !== 0}>
        CREATE USERS
          </ExButton>
        </Wrapper>
      </Wrapper>
      {props.records.length !== 0 &&
      <FormGroup row className={classes.form}>
        <FormControlLabel className={classes.selector}
          control={<Switch checked={skipFirst} onChange={() => { setSkipFirst(!skipFirst) }} />}
          label='Skip First Row'
        />
        <FormControl variant='outlined' className={classes.selector}>
          <InputLabel>username</InputLabel>
          <Select
            label='username'
            value={username}
            onChange={(e) => setUsername(Number(e.target.value))}
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
            value={email}
            onChange={(e) => setEmail(Number(e.target.value))}
          >
            {[...Array(props.records[0].length)].map((_, i) => {
              return (
                <MenuItem value={i} key={`email-${i}`}>{i}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </FormGroup>
      }
    </React.Fragment>
  )
}

export { Menu }
