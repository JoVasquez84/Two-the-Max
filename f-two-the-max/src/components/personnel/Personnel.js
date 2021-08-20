import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { Modal, Backdrop, Fade } from '@material-ui/core'

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
  },
  Modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  ModalButton: {
    marginLeft: theme.spacing(2),
  },
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
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [finalSearchValue, setFinalSearchValue] = useState('')
  const [addFName, setAddFName] = useState('');
  const [addLName, setAddLName] = useState('');
  const [addManNum, setAddManNum] = useState('');

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setAddFName('');
    setAddLName('');
    setAddManNum('');
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };


  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/getpersonnel?search=${finalSearchValue}`)
        .then(response => response.json())
        .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/getpersonnel/')
        .then(response => response.json())
        .then(data => setRows(data))
    }
  }, [finalSearchValue])

  const addPersonnel = async () => {
    fetch(`http://localhost:3002/addpersonnel/${addManNum}/${addFName}/${addLName}`, { method: 'POST' })
      .then(response => {
        handleCloseAdd()
        fetch('http://localhost:3002/getpersonnel/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  return (
    <Paper className={classes.Personnel} >
      <Grid container>
        <Grid className={classes.PersonnelMenu} item xs={12} container >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.PersonnelSearchTextField} placeholder='Search by Man# or Name'></TextField>
            <IconButton onClick={() => setFinalSearchValue(searchValue)}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9}>
            <Button
              variant='outlined'
              onClick={() => handleOpenAdd()}>Add</Button>
            <Button
              variant='outlined'
              disabled={selectedRows.length !== 1}
              onClick={() => handleOpenEdit()}>Edit</Button>
            <Button
              variant='outlined'
              disabled={selectedRows.length === 0}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.Modal}
          open={openAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openAdd}>
            <div className={classes.ModalPaper}>
              <h2 id="transition-modal-title">Transfer To Man#: </h2>
              <TextField onChange={(event) => setAddFName(event.target.value)} value={addFName} placeholder='First Name'></TextField>
              <TextField onChange={(event) => setAddLName(event.target.value)} value={addLName} placeholder='Last Name'></TextField>
              <TextField onChange={(event) => setAddManNum(event.target.value)} value={addManNum} placeholder='Man Number'></TextField>
              <Button
                className={classes.ModalButton}
                variant='outlined'
                disabled={addFName === '' || addLName === '' || addManNum === ''}
                onClick={() => { addPersonnel() }}
              >
                Add Personnel</Button>
            </div>
          </Fade>
        </Modal>
        <Grid className={classes.PersonnelTable} item xs={12}>
          <DataGrid
            rows={rows}
            rowHeight={25}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={newSelectedRows => setSelectedRows(newSelectedRows)}
            selectionModel={selectedRows}
            disableColumnMenu={true}
          />
        </Grid>
      </Grid>
    </Paper >
  );
}