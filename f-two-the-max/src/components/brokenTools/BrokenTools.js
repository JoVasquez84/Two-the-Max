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
  BrokenTools: {
    position: 'relative',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  BrokenToolsSearchTextField: {
    verticalAlign: 'baseline'
  },
  BrokenToolsMenu: {
    height: 'flex'
  },
  ToolTable: {
    height: 300
  }
}));

const columns = [
  {
    field: 'toolId',
    headerName: 'Tool ID',
    type: 'text',
    minWidth: 130,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'text',
    minWidth: 170,
    flex: 1,
    editable: false,
  },
  {
    field: 'manNumber',
    headerName: 'MAN#',
    type: 'text',
    width: 75,
    editable: false
  },
  {
    field: 'issuedTo',
    headerName: 'Issued To',
    type: 'text',
    minWidth: 150,
    editable: false,
  }
];

const dummyRows = [
  {
    id: 1,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 2,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 3,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 4,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 5,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 6,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    toolId: 'DRILSM-01',
    description: 'Small Drill'
  },
];

export default function BrokenTools() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.BrokenTools} >
        <Grid container>
          <Grid className={classes.ToolMenu} item xs={12}>
            <TextField className={classes.ToolSearchTextField} placeholder='Search by Man# or Name'></TextField>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button variant='outlined'>Inspection</Button>
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
    </Grid>
  );
}