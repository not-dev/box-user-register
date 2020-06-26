
import { Backdrop, CircularProgress, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BlockIcon from '@material-ui/icons/Block'
import clsx from 'clsx'
import parseAsync from 'csv-parse'
import iconv from 'iconv-lite'
import jschardet from 'jschardet'
import React from 'react'
import ReactDropzone, { DropzoneState } from 'react-dropzone'

const util = require('util')
const parse = util.promisify(parseAsync)

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

type Records = Array<Array<string>>

type DZProps = {
  setRecords: (records:Array<Array<string>>) => void
}

const Dropzone:React.FC<DZProps> = (props) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)

  /*
  const dropHandleSync = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length !== 0) {
      setLoading(true)
      acceptedFiles.forEach(async (file:File) => {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = arrayBufferToBuffer(arrayBuffer)
        const encoding = jschardet.detect(buffer).encoding === 'UTF-8' ? 'utf8' : 'shift-jis'
        const str = iconv.decode(buffer, encoding)

        const callback: Callback = (err, records) => {
          if (err) {
            console.error(err)
          } else {
            setLoading(false)
            props.setRecords(records)
          }
        }
        csvParse(str, callback)
      })
    }
  }
  */

  const loadfile = async (acceptedFiles: Array<File>) => {
    setLoading(true)
    const input:Array<string> = []
    await Promise.all(
      acceptedFiles.map(async (file:File) => {
        const reader = file.stream().getReader()
        const readChunk = async (read:ReadableStreamReadResult<any>) => {
          if (read.done) {
            console.log('done')
            return
          }
          const buffer = Buffer.from(read.value)
          const encoding = jschardet.detect(buffer).encoding === 'UTF-8' ? 'utf8' : 'shift-jis'
          input.push(iconv.decode(buffer, encoding))
          await readChunk(await reader.read())
        }
        await readChunk(await reader.read())
      })
    )
    return input.join('')
  }

  const dropHandle = async (acceptedFiles: Array<File>) => {
    const input = await loadfile(acceptedFiles)
    const records:Records = await parse(input, {
      trim: true
    })
    setLoading(false)
    props.setRecords(records)
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
                    Drag & Drop CSV File or Click Here.
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
