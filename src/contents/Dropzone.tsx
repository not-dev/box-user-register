
import { Backdrop, Box, CircularProgress, Paper, Snackbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BlockIcon from '@material-ui/icons/Block'
import PublishIcon from '@material-ui/icons/Publish'
import clsx from 'clsx'
import parseAsync from 'csv-parse'
import iconv from 'iconv-lite'
import jschardet from 'jschardet'
import React from 'react'
import ReactDropzone, { DropzoneState, FileRejection } from 'react-dropzone'

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
  },
  snackbar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 16
  }
}))

type Records = Array<Array<string>>

type DZProps = {
  setRecords: (records:Array<Array<string>>) => void
}

const Dropzone:React.FC<DZProps> = (props) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  const [reject, setReject] = React.useState<boolean|string>(false)

  const loadfile = async (acceptedFiles: Array<File>) => {
    setLoading(true)
    const inputs:Array<Array<string>> = acceptedFiles.map(() => [])
    await Promise.all(
      acceptedFiles.map(async (file:File, i) => {
        const reader = file.stream().getReader()
        const readChunk = async (read:ReadableStreamReadResult<any>) => {
          if (read.done) {
            console.log('loaded')
            return
          }
          const buffer = Buffer.from(read.value)
          const encoding = jschardet.detect(buffer).encoding === 'UTF-8' ? 'utf8' : 'shift-jis'
          inputs[i].push(iconv.decode(buffer, encoding))
          await readChunk(await reader.read())
        }
        await readChunk(await reader.read())
      })
    )
    return inputs.map((input) => input.join(''))
  }

  const dropHandle = async (acceptedFiles: Array<File>) => {
    const inputs = await loadfile(acceptedFiles)
    const multiRecords = await Promise.all(
      inputs.map(async (input) => {
        const records:Records = await parse(input, {
          trim: true
        })
        return records
      })
    )
    const records = multiRecords.reduce((acc, cur) => {
      acc.push(...cur)
      return acc
    }, [])
    setLoading(false)
    props.setRecords(records)
  }

  return (
    <Paper className={clsx(classes.root, classes.flexbox)}>
      <ReactDropzone
        onDropAccepted={(acceptedFiles: Array<File>) => dropHandle(acceptedFiles)}
        onDropRejected={(f:FileRejection[]) => setReject(f[0].errors[0].message)}
        accept='.csv, application/vnd.ms-excel'
        multiple={false}
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
                : (
                  <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='center'><PublishIcon fontSize='inherit'/></Box>
                    <Typography variant='h4' color='inherit'>
                        Drag & Drop CSV File or Click Here.
                    </Typography>
                  </Box>
                )
            }
          </div>
        )}
      </ReactDropzone>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' size={64}/>
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={Boolean(reject)}
        onClose={() => setReject(false)}
        message={reject}
        autoHideDuration={4000}
        ContentProps={{
          classes: {
            root: classes.snackbar
          }
        }}
      />
    </Paper>
  )
}

export { Dropzone }
