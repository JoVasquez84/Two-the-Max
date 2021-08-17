import { ButtonGroup, Grid, TextField, createTheme, Input, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, cyan } from '@material-ui/core/colors'

const Theme = createTheme ({
  root: {
    backgroundColor: blueGrey[500],
  },
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: cyan[200],
    }
  }
})

Theme.button ={
  buttonGroup: {
    variant: 'contained',
    color: Theme.palette.text.primary,
    spacing: 4,
  },
  button: {
    variant: 'contained',
    color: Theme.palette.secondary.main,
  },
}
/*
const Buttons = makeStyles(theme => ({
  buttonGroup: {
    variant: 'contained',
    color: theme.palette.text.primary,
    spacing: 4,
  },
  button: {
    variant: 'contained',
    color: theme.palette.secondary.main,
  },
}))
*/

const UiStyling = makeStyles(theme => ({
  toolPage: {
    spacing: 4
  },
  personnelSearchBox: {
    width: '90%',
    marginLeft: '10%'
  }
}))

export {Theme, UiStyling}