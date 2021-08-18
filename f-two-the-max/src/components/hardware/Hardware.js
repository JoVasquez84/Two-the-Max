import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  Hardware: {
    position: 'relative',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  HardwareSearchTextField: {
    verticalAlign: 'baseline'
  },
  HardwareMenu: {
    height: 'flex',
    position: 'relative'
  },
  HardwareTable: {
    height: 300
  }
}));

const columns = [
  {
    field: 'hardwareId',
    headerName: 'NSN ID',
    type: 'text',
    minWidth: 75,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'text',
    minWidth: 75,
    flex: 1,
    editable: false,
  },
  {
    field: 'qty',
    headerName: 'Qty',
    type: 'text',
    width: 60,
    editable: true
  },
  {
    field: 'unit',
    headerName: 'Unit',
    type: 'text',
    width: 65,
    editable: false,
  },
  {
    field: 'location',
    headerName: 'Location',
    type: 'text',
    flex: 1,
    minWidth: 75,
    editable: false,
  }
];

const dummyRows = [
  {
    id: 1,
    hardwareId: 'nut-01',
    description: 'nut',
    qty: 2,
    unit: 'Dozen',
    location: 'Random place'
  },
  {
    id: 2,
    hardwareId: 'nut-01',
    description: 'nut',
    qty: 2,
    unit: 'Unit',
    location: 'Random place'
  },
  {
    id: 3,
    hardwareId: 'nut-01',
    description: 'nut',
    qty: 2,
    unit: 'Unit',
    location: 'Random place'
  },
  {
    id: 4,
    hardwareId: 'nut-01',
    description: 'nut',
    qty: 2,
    unit: 'Unit',
    location: 'Random place'
  },
  {
    id: 5,
    hardwareId: 'nut-01',
    description: 'nut',
    qty: 2,
    unit: 'Unit',
    location: 'Random place'
  }
];

export default function Hardware() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.Hardware} >
        <Grid container>
          <Grid className={classes.HardwareMenu} item xs={12} >
            <TextField className={classes.HardwareSearchTextField} placeholder='Search by NSN or Name'></TextField>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button variant='outlined'>Add</Button>
            <Button variant='outlined'>Edit</Button>
            <Button variant='outlined'>Update</Button>
          </Grid>
          <Grid className={classes.HardwareTable} item xs={12}>
            <DataGrid
              rows={dummyRows}
              rowHeight={25}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              disableColumnMenu={true}
            />
          </Grid>
        </Grid>
      </Paper >
    </Grid>
  );
}