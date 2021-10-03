import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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
    field: 'tool_id',
    headerName: 'Tool ID',
    type: 'text',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'serv_status',
    headerName: 'Servicable',
    type: 'number',
    minWidth: 125,
    editable: false,
  }
];



export default function BrokenTools({ isServStatusChanged, setIsServStatusChanged }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] = useState('')


  // useEffect(() => {
  //   if (finalSearchValue !== '') {
  //     fetch(`http://localhost:3002/AllToolsByStatus?search=${finalSearchValue}`)
  //       .then(response => response.json())
  //       .then(data => setRows(data))
  //   } else {
  //     fetch('http://localhost:3002/AllToolsByStatus')
  //       .then(response => response.json())
  //       .then(data => {
  //         setRows(data)
  //         setIsServStatusChanged(false);
  //       })
  //   }
  // }, [finalSearchValue, isServStatusChanged, setIsServStatusChanged])

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.BrokenTools} >
        <Grid container>
          <Grid className={classes.ToolMenu} item xs={12}>
            <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.ToolSearchTextField} placeholder='Search by Tool ID'></TextField>
            <IconButton onClick={() => setFinalSearchValue(searchValue)} >
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.ToolTable} item xs={12}>
            <DataGrid
              rows={rows}
              rowHeight={25}
              columns={columns}
              disableColumnMenu={true}
            />
          </Grid>
        </Grid>
      </Paper >
    </Grid>
  );
}