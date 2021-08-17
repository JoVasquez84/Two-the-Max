import { Button, ButtonGroup, Grid, TextField, createTheme, Input, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import HardwareHome from './hardware/HardwareHome.js'
import PersonnelHome from './personnel/PersonnelHome.js'
import ToolsHome from './tools/ToolsHome.js'
import Theme from '../Theme.js'



const Home = () => {
  const classes = Theme();

  return (
    <Grid container>
      <Grid item xs={4}>
        <ButtonGroup>
          <Button className={classes.button}>Personnel</Button>
          <Button className={classes.button}>Tool</Button>
        </ButtonGroup>
      </Grid>
      <Grid className={classes.toolPage} item xs={12} container>
        <Grid item xs={4}>
          <TextField placeholder='Search by Man# or Name'></TextField>
        </Grid>
        <Button startIcon={<Search />} variant='contained'></Button>
        <ButtonGroup>
          <Button className={classes.button}>Transfer Tools</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <ButtonGroup>
          <Button className={classes.button}>Edit Hardware</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>

      </Grid>
    </Grid >
  )
}

export default Home