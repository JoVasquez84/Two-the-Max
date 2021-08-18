import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  Personnel: {
    position: 'relative',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  PersonnelSearchTextField: {
    verticalAlign: 'baseline'
  },
  PersonnelMenu: {
    height: 'flex'
  },
  PersonnelTable: {
    height: 370
  }
}));

const columns = [
  {
    field: 'PersonnelId',
    headerName: 'Personnel ID',
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
    minWidth: 200,
    editable: false,
  }
];

const dummyRows = [
  {
    id: 1,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 2,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 3,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 4,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 5,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
  {
    id: 6,
    manNumber: 12345,
    issuedTo: 'Random Joe',
    PersonnelId: 'DRILSM-01',
    description: 'Small Drill'
  },
];

export default function Personnel() {
  const classes = useStyles();

  return (
    <Paper className={classes.Personnel} >
      <Grid container>
        <Grid className={classes.PersonnelMenu} item xs={12} md={6} >
          <TextField className={classes.PersonnelSearchTextField} placeholder='Search by Man# or Name'></TextField>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant='outlined'>Add</Button>
          <Button variant='outlined'>Edit</Button>
          <Button variant='outlined'>Remove</Button>
        </Grid>
        <Grid className={classes.PersonnelTable} item xs={12}>
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