
import { Backdrop, CircularProgress, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BlockIcon from '@material-ui/icons/Block'
import clsx from 'clsx'
import parse, { Callback } from 'csv-parse'
import React from 'react'
import ReactDropzone, { DropzoneState } from 'react-dropzone'

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    padding: theme.spacing(2)
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%'
  },
  base: {
    borderWidth: 3,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: 120,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(
      ['all'],
      { duration: theme.transitions.duration.short }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover
    }
  },
  accepted: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.info.main,
    backgroundColor: theme.palette.action.focus
  },
  rejected: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.action.disabledBackground
  },
  backdrop: {
    zIndex: theme.zIndex.modal,
    color: theme.palette.common.white
  }
}))

type DZProps = {
  setRecords: (records:Array<Array<string>>) => void
}

const Dropzone:React.FC<DZProps> = (props) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)

  const dropHandle = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length !== 0) {
      setLoading(true)
      acceptedFiles.forEach((file:File) => {
        const reader = new FileReader()

        const callback: Callback = (err, records) => {
          if (err) {
            console.error(err)
          } else {
            console.log(records)
            props.setRecords(records)
            setLoading(false)
          }
        }

        reader.onload = () => {
          const input = reader.result as string
          parse(input, callback)
        }
        reader.readAsBinaryString(file)
      })
    }
  }

  return (
    <Paper className={clsx(classes.root, classes.flexbox)}>
      <ReactDropzone
        onDrop={(acceptedFiles: Array<File>) => dropHandle(acceptedFiles)}
        accept='.csv, application/vnd.ms-excel'
      >
        {({ isDragAccept, isDragReject, getRootProps, getInputProps }:DropzoneState) => (
          <div {...getRootProps({ className: clsx(classes.flexbox, classes.base, isDragAccept && classes.accepted, isDragReject && classes.rejected) })}>
            <input {...getInputProps()} />
            {isDragReject ? (
              <BlockIcon fontSize='inherit'/>
            )
              : isDragAccept ? (
                <AddCircleOutlineIcon fontSize='inherit'/>
              )
                : <Typography variant='h4' color='inherit'>
                    Drag 'n' drop some files here, or click to select files
                </Typography>
            }
          </div>
        )}
      </ReactDropzone>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' size={64}/>
      </Backdrop>
    </Paper>
  )
}

export { Dropzone }
