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
    field: 'fname',
    headerName: 'First Name',
    type: 'text',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'lname',
    headerName: 'Last Name',
    type: 'text',
    width: 150,
    editable: false
  },
  {
    field: 'man_number',
    headerName: 'Man Number',
    type: 'text',
    minWidth: 150,
    editable: false,
  }
];

export default function Personnel() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] =useState('')
  // const [Add, setAdd] = useState(1)
  
  // const newPersonnelAdd = () => {
  //   setAdd(add + 1);
  // };

  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/getpersonnel?search=${finalSearchValue}`)
      .then(response =>response.json())
      .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/getpersonnel/')
      .then(response => response.json())
      .then(data => setRows(data))
    }
  },[finalSearchValue] )



// useEffect(() => {
//   const options = {
//     method: `POST`
//   }
//   fetch(`http://localhost:3002/addpersonnel/${addManNumber}/${addFName}/${addLName}`,options)
//   .then(response =>response.json())
//   .then(data => setRows(data)) 
// }, [add])



  return (
    <Paper className={classes.Personnel} >
      <Grid container>
        <Grid className={classes.PersonnelMenu} item xs={12} md={6} >
          <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.PersonnelSearchTextField} placeholder='Search by Man# or Name'></TextField>
          <IconButton>
            <SearchIcon onClick= {() => setFinalSearchValue(searchValue)}/>
          </IconButton>
          <Button  variant='outlined'>Add</Button>
          <Button variant='outlined'>Edit</Button>
          <Button variant='outlined'>Remove</Button>
        </Grid>
        <Grid className={classes.PersonnelTable} item xs={12}>
          <DataGrid
            rows={rows}
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