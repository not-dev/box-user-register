
import { Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BlockIcon from '@material-ui/icons/Block'
import clsx from 'clsx'
import React from 'react'
import ReactDropzone, { DropzoneState } from 'react-dropzone'

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(2)
  },
  base: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
      backgroundColor: theme.palette.action.hover
    }
  },
  accepted: {
    borderColor: theme.palette.info.main,
    backgroundColor: theme.palette.action.focus
  },
  rejected: {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.action.disabledBackground
  }
}))

const Dropzone:React.FC = () => {
  const classes = useStyles()

  const callback = (acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file:File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        console.log('file')
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  return (
    <Paper className={classes.root}>
      <ReactDropzone
        onDrop={(acceptedFiles: Array<File>) => callback(acceptedFiles)}
        accept='.csv, application/vnd.ms-excel'
      >
        {({ isDragAccept, isDragReject, getRootProps, getInputProps }:DropzoneState) => (
          <div {...getRootProps({ className: clsx(classes.base, isDragAccept && classes.accepted, isDragReject && classes.rejected) })}>
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
    </Paper>
  )
}

export { Dropzone }
