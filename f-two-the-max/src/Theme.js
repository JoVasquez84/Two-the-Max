import { Button, ButtonGroup, Grid, TextField, createTheme, Input, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors'

const Theme = makeStyles((theme) => ({
  root: {
    backgroundColor: blueGrey[500],
  },
  toolPage: {
    spacing: 4
  },
  buttonGroup: {
    variant: 'contained',
    color: theme.palette.text.primary,
    spacing: 4,
  },
  button: {
    variant: 'contained',
    color: theme.palette.text.secondary,
    color: theme.palette.background.secondaryn
  }
}));

export default Theme