import { Button, ButtonGroup, Grid, TextField, Input, Divider } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import HardwareHome from './hardware/HardwareHome.js'
import PersonnelHome from './personnel/PersonnelHome.js'
import ToolsHome from './tools/ToolsHome.js'
import { Theme, UiStyling } from '../Theme.js'

const Home = () => {
  const uiStyling = UiStyling(Theme);

  return (
    <ThemeProvider theme={Theme}>
      <Grid container>
        <Grid item xs={4}>
          <ButtonGroup>
            <Button>Personnel</Button>
            <Button>Tools</Button>
          </ButtonGroup>
        </Grid>
        <Grid className={uiStyling.toolPage} item xs={12} container>
          <Grid item xs={3}>
            <TextField className={uiStyling.personnelSearchBox} placeholder='Search by Man# or Name'></TextField>
          </Grid>
          <Grid item xs={1}>
            <Button startIcon={<Search />} variant='contained'></Button>
          </Grid>
          <Grid item xs={2}>
            <ButtonGroup>
              <Button>Transfer Tools</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            {/* <ToolsHome /> */}
          </Grid>
        </Grid>
        <Grid className={uiStyling.hardwarePage} item xs={6} container>
          <Grid item xs={4}>
            <TextField className={uiStyling.hardwareSearchBox} placeholder='Search by NSN'></TextField>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup>
              <Button>Edit Hardware</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            {/* <HardwareHome /> */}
          </Grid>
        </Grid>
        <Grid className={uiStyling.repairPage} item xs={6} container>
          <Grid item xs={4}>
            <TextField className={uiStyling.toolSearchBox} placeholder='Search by Name'></TextField>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button>Inspection</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid >
    </ThemeProvider>
  )
}

export default Home