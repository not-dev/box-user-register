import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'

const getColor = (props:DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const Container = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: (props:DropzoneRootProps) => getColor(props),
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
})

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(2)
  }
}))

const Dropzone:React.FC = () => {
  const classes = useStyles()

  const onDrop = useCallback((acceptedFiles) => {
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
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'text/csv' })

  return (
    <div className={classes.root}>
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
    </div>
  )
}

export { Dropzone }
