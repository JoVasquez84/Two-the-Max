import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  }
}));

const columns = [
  {
    field: 'nsn',
    headerName: 'NSN',
    type: 'text',
    flex: 1,
    minWidth: 120,
    editable: false,
  },
  {
    field: 'pn',
    headerName: 'PN',
    type: 'text',
    flex: 1,
    minWidth: 120,
    editable: false,
  },
  {
    field: 'qty_available',
    headerName: 'Qty',
    type: 'text',
    flex: 1,
    minWidth: 120,
    editable: false,
  },
  {
    field: 'location',
    headerName: 'Location',
    type: 'text',
    minWidth: 75,
    editable: false,
  }
];


export default function Hardware() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] =useState('')

  //State for TransferModal
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [addHwNSN, setAddHwNSN] = useState('');
  const [addHwPN, setAddHwPN] = useState('');
  const [addHwDescr, setAddHwDescr] = useState('');
  const [addHwLocation, setAddHwLocation] = useState('');
  const [addHwMeasure, setAddHwMeasure] = useState('');
  const [addHwQtyAvailable, setAddHwQtyAvailable] = useState('');
  const [addHwQtyLowThreshold, setAddHwQtyLowThreshold] = useState('');


  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/gethardware?search=${finalSearchValue}`)
      .then(response =>response.json())
      .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/gethardware/')
      .then(response => response.json())
      .then(data => setRows(data))
    }
  },[finalSearchValue] )

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setAddHwNSN('');
    setAddHwPN('');
    setAddHwDescr('');
    setAddHwLocation('');
    setAddHwMeasure('');
    setAddHwQtyAvailable('');
    setAddHwQtyLowThreshold('');
  }

const addHardware = async () => {
  var promises =[]

  promises.push(new Promise((resolve, reject) => {
  fetch(`http://localhost:3002/addhardware/${addHwNSN}/${addHwPN}/${addHwDescr}/${addHwLocation}/${addHwMeasure}/${addHwQtyAvailable}/${addHwQtyLowThreshold}`, { method: 'POST' })
    .then(response => resolve(response))
  }));
  Promise.all(promises)
      .then((responses) => {
        console.log(responses);
        handleCloseAdd();
        fetch('http://localhost:3002/gethardware/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
    
};


  // const editHardware = async () => {
  //   var promises = [];

  //   for (let row of rows) {
  //     if (!selectedRows.includes(row.id)) {
  //       continue;
  //     }
  //     promises.push(new Promise((resolve, reject) => {
  //       fetch(`/edithardware/${addHwNSN}/${addHwNSN}/${addHwNSN}/${addHwNSN}/${addHwNSN}/${addHwNSN}/${addHwNSN}`, { method: 'POST' })
  //         .then(response => resolve(response));
  //     }));

  //   }

  //   Promise.all(promises)
  //     .then((responses) => {
  //       console.log(responses);
  //       handleClose();
  //       fetch(`http://localhost:3002/edithardware/`)
  //         .then(response => response.json())
  //         .then(data => setRows(data))
  //     });
  // }

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.Hardware} >
        <Grid container>
          <Grid className={classes.HardwareMenu} item xs={12} >
            <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.HardwareSearchTextField} placeholder='Search by NSN or PN'></TextField>
            <IconButton>
              <SearchIcon onClick= {() => setFinalSearchValue(searchValue)}/>
            </IconButton>
            <Button variant='outlined'
            onClick={() => handleOpenAdd()}>Add</Button>
            <Button variant='outlined'>Edit</Button>
            <Button variant='outlined'>Update</Button>
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
              <h2 id="transition-modal-title">Add HardWare </h2>
              <TextField onChange={(event) => setAddHwNSN(event.target.value)} value={addHwNSN} placeholder='Enter Hardware NSN'></TextField>
              <TextField onChange={(event) => setAddHwPN(event.target.value)} value={addHwPN} placeholder='Enter Hardware PN'></TextField>
              <TextField onChange={(event) => setAddHwDescr(event.target.value)} value={addHwDescr} placeholder='Describe Hardware'></TextField>
              <TextField onChange={(event) => setAddHwLocation(event.target.value)} value={addHwLocation} placeholder='Enter Hardware Storage Location'></TextField>
              <TextField onChange={(event) => setAddHwMeasure(event.target.value)} value={addHwMeasure} placeholder='Enter Hardware Unit of Measure'></TextField>
              <TextField onChange={(event) => setAddHwQtyAvailable(event.target.value)} value={addHwQtyAvailable} placeholder='Enter Hardware Quantity'></TextField>
              <TextField onChange={(event) => setAddHwQtyLowThreshold(event.target.value)} value={addHwQtyLowThreshold} placeholder='Enter Quantity Low Threshold'></TextField>
              <Button
                className={classes.ModalButton}
                variant='outlined'
                disabled={addHwNSN === ''}
                onClick={() => { addHardware() }}
              >
                Add New HardWare</Button>
            </div>
          </Fade>
        </Modal>
          <Grid className={classes.HardwareTable} item xs={12}>
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
    </Grid>
  );
}