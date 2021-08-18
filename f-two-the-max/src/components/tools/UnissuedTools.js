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
  UnissuedTools: {
    position: 'relative',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  ToolSearchTextField: {
    verticalAlign: 'baseline'
  },
  ToolMenu: {
    height: 'flex'
  },
  ToolTable: {
    height: 370
  }
}));

const columns = [
  {
    field: 'toolId',
    headerName: 'Tool ID',
    type: 'text',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'text',
    minWidth: 200,
    flex: 1,
    editable: false,
  },
  {
    field: 'location',
    headerName: 'Location',
    type: 'text',
    width: 200,
    editable: false
  }
];

const dummyRows = [
  {
    id: 1,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 2,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 3,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 4,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 5,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 6,
    location: 'Random Place',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
];

export default function UnissuedTools() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch('#')
      .then(response => response.json())
      .then(data => setRows(data));
  }, [setRows]);

  return (
    <Paper className={classes.UnissuedTools} >
      <Grid container>
        <Grid className={classes.ToolMenu} item xs={12} md={6} >
          <TextField className={classes.ToolSearchTextField} placeholder='Search by Tool ID'></TextField>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant='outlined'>Add</Button>
          <Button variant='outlined'>Edit</Button>
          <Button variant='outlined'>Checkout</Button>
        </Grid>
        <Grid className={classes.ToolTable} item xs={12}>
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
  );
}