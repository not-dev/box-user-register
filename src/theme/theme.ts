import 'typeface-roboto'
import 'typeface-comfortaa'

import { createMuiTheme } from '@material-ui/core'
import { amber, grey, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark
    primary: {
      main: '#0061D5'
    },
    secondary: {
      main: amber.A400
    },
    error: {
      main: red[500]
    },
    text: {
      primary: grey.A400, // 300
      secondary: grey[700] // 500
    },
    background: {
      paper: grey[50], // 800
      default: grey[100] // A400
    },
    common: {
      black: grey.A400,
      white: grey[50]
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: '"Roboto","BIZ UPDGothic",sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 500
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          '&::-webkit-scrollbar': {
            width: 6
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: grey[400],
            borderRadius: 3
          }
        },
        html: {
          fontSize: 16
        },
        body: {
          textRendering: 'optimizeLegibility'
        }
      }
    }
  }
})

export { theme }
