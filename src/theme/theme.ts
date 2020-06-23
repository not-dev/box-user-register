import { createMuiTheme } from '@material-ui/core'
import { grey, orange, red, teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark
    primary: {
      main: teal[500]
    },
    secondary: {
      main: orange[600]
    },
    error: {
      main: red.A400
    },
    text: {
      primary: grey.A400, // 300
      secondary: grey[700] // 500
    },
    background: {
      paper: grey[100], // 800
      default: grey[200] // A400
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
