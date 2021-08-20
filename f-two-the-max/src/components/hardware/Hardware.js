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


const SET_TO_EMPTY = 'Empty'
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
  },
  {
    field: 'descr',
    headerName: 'Description',
    type: 'text',
    minWidth: 75,
    editable: false,
  }
];


export default function Hardware() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] = useState('')

  //State for TransferModal
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // HW states for add modal 
  const [addHwNSN, setAddHwNSN] = useState('');
  const [addHwPN, setAddHwPN] = useState('');
  const [addHwDescr, setAddHwDescr] = useState('');
  const [addHwLocation, setAddHwLocation] = useState('');
  const [addHwMeasure, setAddHwMeasure] = useState('');
  const [addHwQtyAvailable, setAddHwQtyAvailable] = useState('');
  const [addHwQtyLowThreshold, setAddHwQtyLowThreshold] = useState('');

  // HW states for edit modal
  const [oldHwNsn, setOldHwNsn] = useState('');
  const [editHwNsn, setEditHwNsn] = useState('');
  
  //HW states for removal modal
  const [deleteHwNsn, setDeleteHwNsn] = useState('')

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

  const handleOpenDelete = () => {
    setOpenDelete(true);
    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      setDeleteHwNsn(row.nsn);
    }
  }

const handleCloseDelete = () => {
  setOpenDelete(false);
  setDeleteHwNsn('')
}

const handleOpenEdit = () => {
  setOpenEdit(true)
  for (let row of rows) {
    if (!selectedRows.includes(row.id)) {
      continue;
    }
    setEditHwNsn(row.nsn);
    setOldHwNsn(row.nsn);
    setAddHwPN(row.pn);
    setAddHwDescr(row.descr);
    setAddHwLocation(row.location);
    setAddHwMeasure(row.unit_of_measure);
    setAddHwQtyAvailable(row.qty_available)
    setAddHwQtyLowThreshold(row.qty_low_threshold)
  }
}

const handleCloseEdit = () => {
  setOpenEdit(false);
  setEditHwNsn('');
  setAddHwPN('');
    setAddHwDescr('');
    setAddHwLocation('');
    setAddHwMeasure('');
    setAddHwQtyAvailable('')
    setAddHwQtyLowThreshold('')
}


  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/gethardware?search=${finalSearchValue}`)
        .then(response => response.json())
        .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/gethardware/')
        .then(response => response.json())
        .then(data => {
          setRows(data)
        })
    }
  }, [finalSearchValue])

  const addHardware = async () => {
    let promises = []

    promises.push(new Promise((resolve, reject) => {
      fetch(`http://localhost:3002/addhardware/${addHwNSN}/${addHwPN}/${addHwDescr}/${addHwLocation}/${addHwMeasure}/${addHwQtyAvailable}/${addHwQtyLowThreshold}`, { method: 'POST' })
        .then(response => resolve(response))
    }));
    Promise.all(promises)
      .then((responses) => {
        handleCloseAdd();
        fetch('http://localhost:3002/gethardware/')
          .then(response => response.json())
          .then(data => setRows(data))
      });

  };

  const deleteHardware = async () => {
    let promises = [];

    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      promises.push(new Promise((resolve, reject) => {
        fetch(`http://localhost:3002/deletehardware/${row.nsn}`, { method: 'DELETE' })
          .then(response => resolve(response));
      }));
    }

    Promise.all(promises)
      .then((responses) => {
        handleCloseDelete();
        fetch('http://localhost:3002/gethardware/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  const editHardware = async () => {
    let promises = [];

    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      let urlAddHwPN = addHwPN === '' ? SET_TO_EMPTY : addHwPN
      let urlAddHwDescr = addHwDescr === '' ? SET_TO_EMPTY : addHwDescr;
      let urlAddHwLocation = addHwLocation === '' ? SET_TO_EMPTY : addHwLocation;    
      let urlAddHwMeasure = addHwMeasure === '' ? SET_TO_EMPTY : addHwMeasure;
      let urlAddHwQtyAvailable = addHwQtyAvailable === '' ? SET_TO_EMPTY : addHwQtyAvailable;
      let urlAddHwQtyLowThreshold = addHwQtyLowThreshold === '' ? SET_TO_EMPTY : addHwQtyLowThreshold;

      promises.push(new Promise((resolve, reject) => {
        fetch(`http://localhost:3002/edithardware/${oldHwNsn}/${editHwNsn}/${urlAddHwPN}/${urlAddHwDescr}/${urlAddHwLocation}/${urlAddHwMeasure}/${urlAddHwQtyAvailable}/${urlAddHwQtyLowThreshold}`, { method: 'PATCH' })
          .then(response => resolve(response));
      }));
    }

    Promise.all(promises)
      .then((responses) => {
        handleCloseEdit();
        fetch(`http://localhost:3002/gethardware/`)
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.Hardware} >
        <Grid container>
          <Grid className={classes.HardwareMenu} item xs={12} container>
            <Grid item xs={12} sm={6} md={12} lg={5}>
              <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.HardwareSearchTextField} placeholder='Search by NSN or PN'></TextField>
              <IconButton onClick={() => setFinalSearchValue(searchValue)}>
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={7}>
              <Button 
              variant='outlined'
                onClick={() => handleOpenAdd()}
                >
                Add</Button>
              <Button
                variant='outlined'
                onClick={() => handleOpenEdit()}
                disabled={selectedRows.length !== 1}
              >
                Edit
              </Button>
              <Button
                variant='outlined'
                onClick={() => handleOpenDelete()}
                disabled={selectedRows.length !== 1}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          {/*/ Add Modal */}
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
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.Modal}
            open={openEdit}
            onClose={handleCloseEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openEdit}>
              <div className={classes.ModalPaper}>
                <h2 id="transition-modal-title">Edit HardWare </h2>
                <TextField onChange={(event) => setEditHwNsn(event.target.value)} value={editHwNsn} placeholder='Enter Hardware NSN'></TextField>
                <TextField onChange={(event) => setAddHwPN(event.target.value)} value={addHwPN} placeholder='Enter Hardware PN'></TextField>
                <TextField onChange={(event) => setAddHwDescr(event.target.value)} value={addHwDescr} placeholder='Describe Hardware'></TextField>
                <TextField onChange={(event) => setAddHwLocation(event.target.value)} value={addHwLocation} placeholder='Enter Hardware Storage Location'></TextField>
                <TextField onChange={(event) => setAddHwMeasure(event.target.value)} value={addHwMeasure} placeholder='Enter Hardware Unit of Measure'></TextField>
                <TextField onChange={(event) => setAddHwQtyAvailable(event.target.value)} value={addHwQtyAvailable} placeholder='Enter Hardware Quantity'></TextField>
                <TextField onChange={(event) => setAddHwQtyLowThreshold(event.target.value)} value={addHwQtyLowThreshold} placeholder='Enter Quantity Low Threshold'></TextField>
                <Button
                  className={classes.ModalButton}
                  variant='outlined'
                  disabled={editHwNsn === ''}
                  onClick={() => { editHardware() }}
                >
                  Edit HardWare</Button>
              </div>
            </Fade>
          </Modal> 
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.Modal}
            open={openDelete}
            onClose={handleCloseDelete}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openDelete}>
              <div className={classes.ModalPaper}>
                <h2 id="transition-modal-title">Delete HardWare By NSN</h2>
                <TextField onChange={(event) => setDeleteHwNsn(event.target.value)} value={deleteHwNsn} placeholder='Enter HW NSN'></TextField>
                <Button
                  className={classes.ModalButton}
                  variant='outlined'
                  onClick={() => { deleteHardware() }}
                >
                  Delete HardWare By NSN</Button>
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
              onSelectionModelChange={newSelectedRows => setSelectedRows(newSelectedRows)}
              selectionModel={selectedRows}
              disableColumnMenu={true}
            />
          </Grid>
        </Grid>
      </Paper >
    </Grid>
  );
}