import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import React from 'react'

const ExButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  width: 120
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
  dialogTitle: {
    color: theme.palette.warning.main
  }
}))

type MProps = {
  disabled: boolean,
  execute: () => void,
  deleteAll: () => void
}

const Menu:React.FC<MProps> = (props) => {
  const classes = useStyles()
  const [confirm, setConfirm] = React.useState(false)

  return (
    <React.Fragment>
      <Wrapper className={classes.root}>
        <Wrapper className={classes.title}>
          <Typography variant='h4' color='primary' style={{ fontFamily: 'comfortaa, sans-serif' }}>
            box User Register
          </Typography>
        </Wrapper>
        <Wrapper>
          <ExButton variant='contained' color='default' disabled={props.disabled} onClick={props.deleteAll}>
            CLEAR
          </ExButton>
          <ExButton variant='contained' color='primary' disabled={props.disabled} onClick={() => { setConfirm(true) }}>
            SUBMIT
          </ExButton>
        </Wrapper>
      </Wrapper>
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle className={classes.dialogTitle}>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この操作は取り消せません<br/>
            実行しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(false)} color='primary' autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => { setConfirm(false); props.execute() }} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { Menu }
