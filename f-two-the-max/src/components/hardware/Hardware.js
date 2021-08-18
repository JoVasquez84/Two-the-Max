import { useState, useEffect } from 'react';
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
    headerName: 'NSN / Part#',
    type: 'text',
    flex: 1,
    minWidth: 120,
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
    field: 'location',
    headerName: 'Location',
    type: 'text',
    minWidth: 75,
    editable: false,
  }
];

const dummyRows = [
  {
    id: 1,
    hardwareId: 'nut-01',
    qty: 2,
    location: '100'
  },
  {
    id: 2,
    hardwareId: 'nut-01',
    qty: 2,
    location: '100'
  },
  {
    id: 3,
    hardwareId: 'nut-01',
    qty: 2,
    location: '100'
  }
];

export default function Hardware() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch('#')
      .then(response => response.json())
      .then(data => setRows(data));
  }, [setRows]);

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