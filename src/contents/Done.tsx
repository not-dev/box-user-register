import { Button, CircularProgress, Grow, Typography } from '@material-ui/core'
import { createStyles, makeStyles, styled, Theme, useTheme } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import React from 'react'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: '100vh',
    width: '100vw'
  },
  icon: {
    flex: 3,
    fontSize: 160,
    justifyContent: 'flex-end',
    padding: theme.spacing(2)
  },
  layeredOu: {
    position: 'relative',
    backgroundColor: '#f00000',
    height: 160
  },
  layeredIn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  circle: {
    '& svg': {
      '& circle': {
        strokeWidth: 3.6 * 160 / 192
      }
    }
  },
  msg: {
    padding: theme.spacing(4)
  },
  action: {
    flex: 2,
    justifyContent: 'flex-start'
  }
}))

type DProps = {
  status?: any,
  action?: () => void
}

const Done:React.FC<DProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [deg, setDeg] = React.useState(0)

  const circle = () => {
    let deg = 0
    while (deg < 100) {
      deg++
      setDeg(deg)
    }
  }

  return (
    <Wrapper className={classes.root}>
      <Wrapper className={classes.icon}>
        <div className={classes.layeredOu}>
          <Wrapper className={classes.layeredIn}>
            <Grow in timeout={theme.transitions.duration.complex} onEntered={circle}>
              <DoneIcon fontSize='inherit' color='inherit'/>
            </Grow >
          </Wrapper>
          <Wrapper className={classes.layeredIn}>
            <CircularProgress variant='static' size={192} color='inherit' value={deg} className={classes.circle}/>
          </Wrapper>
        </div>
      </Wrapper>
      <Wrapper className={classes.msg}>
        <Typography variant='h4' color='inherit'>
          {props.status}
        </Typography>
      </Wrapper>
      <Wrapper className={classes.action}>
        <Button variant='text' color='inherit' onClick={props.action}>
          DOWNLOAD LOG
        </Button>
      </Wrapper>
    </Wrapper>
  )
}

export { Done }
