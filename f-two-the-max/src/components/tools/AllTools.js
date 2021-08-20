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
  AllTools: {
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
    field: 'tool_id',
    headerName: 'Tool ID',
    type: 'text',
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
    field: 'checked_out_to',
    headerName: 'Checked Out To',
    type: 'text',
    minWidth: 200,
    flex: 1,
    editable: false,
  }
];

export default function AllTools({ setIsServStatusChanged }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  //State for Search
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] = useState('')

  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/AllTools?search=${finalSearchValue}`)
        .then(response => response.json())
        .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/AllTools')
        .then(response => response.json())
        .then(data => setRows(data));
    }
  }, [finalSearchValue]);


  const [selectedRows, setSelectedRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);

  //Database columns
  const [toolId, setToolId] = useState('');
  const [description, setDescription] = useState('');
  const [checkoutToManNumber, setCheckoutToManNumber] = useState('')
  const [servStatus, setServStatus] = useState('');
  //Only used for edit so we can find right tool and update
  const [oldToolId, setOldToolId] = useState('');

  const handleOpenEdit = () => {
    setOpenEdit(true);
    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      setToolId(row.tool_id);
      setOldToolId(row.tool_id);
      setDescription(row.descr);
      setCheckoutToManNumber(row.checked_out_to)
      setServStatus(row.serv_status)
    }
  }

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setToolId('');
    setDescription('');
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setToolId('');
    setDescription('');
    setCheckoutToManNumber('');
    setServStatus('');
  }

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
    setCheckoutToManNumber('');
  }

  const addTool = async () => {
    let urlPath = `addTool/${toolId}/${description}`
    fetch(`http://localhost:3002/${urlPath}`, { method: 'POST' })
      .then((responses) => {
        handleCloseAdd();
        fetch('http://localhost:3002/AllTools/')
          .then(response => response.json())
          .then(data => {
            setRows(data);
            setIsServStatusChanged(true);
          })
      });
  }

  const editTool = async () => {
    let new_tool_id = oldToolId !== toolId ? `new_tool_id=${toolId}` : '';
    let descr = description !== null ? `&descr=${description}` : '';
    let checked_out_to = checkoutToManNumber !== null ? `&checked_out_to=${checkoutToManNumber}` : '';
    let serv_status = servStatus !== null ? `&serv_status=${servStatus}` : '';
    if (serv_status !== null) {
      setIsServStatusChanged(true)
    }
    let urlPath = `editTool/${oldToolId}/?${new_tool_id}${descr}${checked_out_to}${serv_status}`
    fetch(`http://localhost:3002/${urlPath}`, { method: 'PATCH' })
      .then((responses) => {
        handleCloseEdit();
        fetch('http://localhost:3002/AllTools/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  //if manNum is empty string, we do checkin
  const checkoutTools = async (manNum) => {
    var promises = [];

    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      promises.push(new Promise((resolve, reject) => {
        let urlPath = manNum === '' ? `checkintool/${row.tool_id}/` : `checkouttool/${row.tool_id}/${manNum}`
        fetch(`http://localhost:3002/${urlPath}`, { method: 'PATCH' })
          .then(response => resolve(response));
      }));
    }

    Promise.all(promises)
      .then((responses) => {
        handleCloseCheckout();
        fetch('http://localhost:3002/AllTools/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  const removeTools = async () => {
    var promises = [];

    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      promises.push(new Promise((resolve, reject) => {
        let urlPath = `removeTool/${row.tool_id}/`
        fetch(`http://localhost:3002/${urlPath}`, { method: 'DELETE' })
          .then(response => resolve(response));
      }));
    }

    Promise.all(promises)
      .then((responses) => {
        fetch('http://localhost:3002/AllTools/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  return (
    <Paper className={classes.AllTools} >
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.ToolSearchTextField} placeholder='Search Tool ID / Name'></TextField>
          <IconButton onClick={() => setFinalSearchValue(searchValue)}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid className={classes.ToolMenu} item xs={12} md={4}>
          <Button
            variant='outlined'
            onClick={() => setOpenAdd(true)}
          >Add</Button>
          <Button
            variant='outlined'
            disabled={selectedRows.length !== 1}
            onClick={() => handleOpenEdit()}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            disabled={selectedRows.length === 0}
            onClick={() => setOpenCheckout(true)}
          >
            Checkout
          </Button>
          {/* Add Modal */}
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
                <TextField onChange={(event) => setToolId(event.target.value)} value={toolId} placeholder='Enter Tool ID'></TextField>
                <TextField onChange={(event) => setDescription(event.target.value)} value={description} placeholder='Enter Description'></TextField>
                <Button
                  className={classes.ModalButton}
                  variant='outlined'
                  disabled={toolId === '' || description === ''}
                  onClick={() => { addTool() }}
                >
                  Add Tool</Button>
              </div>
            </Fade>
          </Modal>
          {/* Edit Modal */}
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
                <h2 id="transition-modal-title">Transfer To Man#: </h2>
                <TextField onChange={(event) => setToolId(event.target.value)} value={toolId} placeholder='Enter Tool ID'></TextField>
                <TextField onChange={(event) => setDescription(event.target.value)} value={description} placeholder='Enter Description'></TextField>
                <TextField onChange={(event) => setCheckoutToManNumber(event.target.value)} value={checkoutToManNumber} placeholder='Enter Checkout to Man Number'></TextField>
                <TextField onChange={(event) => setServStatus(event.target.value)} value={servStatus} placeholder='Enter Service Status'></TextField>
                <Button
                  className={classes.ModalButton}
                  variant='outlined'
                  disabled={toolId}
                  onClick={() => { editTool() }}
                >
                  Edit Tool</Button>
              </div>
            </Fade>
          </Modal>
          {/* Checkout Modal */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.Modal}
            open={openCheckout}
            onClose={handleCloseCheckout}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openCheckout}>
              <div className={classes.ModalPaper}>
                <h2 id="transition-modal-title">Transfer To Man#: </h2>
                <TextField
                  onChange={(event) => setCheckoutToManNumber(event.target.value)}
                  value={checkoutToManNumber}
                  placeholder='Enter Target Man#' />
                <Button
                  className={classes.ModalButton}
                  variant='outlined'
                  disabled={checkoutToManNumber === ''}
                  onClick={() => { checkoutTools(checkoutToManNumber) }}
                >
                  Transfer Tools</Button>
              </div>
            </Fade>
          </Modal>
        </Grid>
        <Grid className={classes.ToolMenu} item xs={12} md={3} >
          <Button
            variant='outlined'
            disabled={selectedRows.length === 0}
            onClick={() => checkoutTools('')}
          >
            Checkin
          </Button>
          <Button
            variant='outlined'
            disabled={selectedRows.length === 0}
            onClick={() => removeTools()}
          >
            Remove
          </Button>
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
            disableColumnMenu={true}
          />
        </Grid>
      </Grid>
    </Paper >
  );
}