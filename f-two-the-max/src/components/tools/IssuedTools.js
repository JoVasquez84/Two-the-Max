// import backendServer from '../../backendServer.js';
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
  IssuedTools: {
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
    field: 'tool_id',
    headerName: 'Tool ID',
    type: 'number',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'descr',
    headerName: 'Description',
    type: 'text',
    minWidth: 200,
    flex: 1,
    editable: false,
  },
  {
    field: 'man_number',
    headerName: 'MAN#',
    type: 'text',
    width: 75,
    editable: false
  },
  {
    field: 'lname',
    headerName: 'Issued To',
    type: 'text',
    minWidth: 200,
    editable: false,
  }
];

export default function IssuedTools() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] =useState('')

  
  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/IssuedTools?search=${finalSearchValue}`)
      .then(response =>response.json())
      .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/IssuedTools/')
      .then(response => response.json())
      .then(data => setRows(data))
    }
  },[finalSearchValue] )

  return (
    <Paper className={classes.IssuedTools} >
      <Grid container>
        <Grid className={classes.ToolMenu} item xs={12} md={6} >
          <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} id = 'issuedToolsTextField' className={classes.ToolSearchTextField} placeholder='Search by Man# or Name'></TextField>
          <IconButton>
            <SearchIcon onClick={() => setFinalSearchValue(searchValue)}/>
          </IconButton>
          <Button
            variant='outlined'
            disabled={selectedRows.length === 0}
          >
            Transfer Tools</Button>
        </Grid>
        <Grid className={classes.ToolTable} item xs={12}>
          <DataGrid
            rows={rows}
            rowHeight={25}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={newSelectedRows => setSelectedRows(newSelectedRows)}
            selectionModel={selectedRows}
            disableColumnMenu={false}
          />
        </Grid>
      </Grid>
    </Paper >
  );
}