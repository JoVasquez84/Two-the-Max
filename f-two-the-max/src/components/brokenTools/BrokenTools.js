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
  ToolSearchTextField: {
    verticalAlign: 'baseline'
  },
  ToolsMenu: {
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
    minWidth: 150,
    editable: false,
  },
  {
    field: 'servicable',
    headerName: 'Servicable',
    type: 'boolean',
    minWidth: 125,
    editable: false,
  }
];

const dummyRows = [
  {
    id: 1,
    toolId: 'DRILSM-01',
    servicable: true
  },
  {
    id: 2,
    toolId: 'DRILSM-01',
    servicable: false
  },
];

export default function BrokenTools() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.BrokenTools} >
        <Grid container>
          <Grid className={classes.ToolMenu} item xs={12}>
            <TextField className={classes.ToolSearchTextField} placeholder='Search by Tool ID'></TextField>
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