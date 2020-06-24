import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import React from 'react'

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

const Menu:React.FC = () => {
  const classes = useStyles()
  console.log(classes, Wrapper)

  return (
    <div></div>
  )
}

export { Menu }
