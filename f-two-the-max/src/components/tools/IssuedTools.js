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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  //State for Table
  const [rows, setRows] = useState([]);

  //State for Search
  const [searchValue, setSearchValue] = useState('');
  const [finalSearchValue, setFinalSearchValue] = useState('')

  //State for TransferModal
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [transferManNumberTarget, setTransferManNumberTarget] = useState('')


  useEffect(() => {
    if (finalSearchValue !== '') {
      fetch(`http://localhost:3002/IssuedTools?search=${finalSearchValue}`)
        .then(response => response.json())
        .then(data => setRows(data))
    } else {
      fetch('http://localhost:3002/IssuedTools/')
        .then(response => response.json())
        .then(data => setRows(data))
    }
  }, [finalSearchValue])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTransferManNumberTarget('');
  };

  const makeTransfer = async () => {
    var promises = [];

    for (let row of rows) {
      if (!selectedRows.includes(row.id)) {
        continue;
      }
      promises.push(new Promise((resolve, reject) => {
        fetch(`http://localhost:3002/checkouttool/${row.tool_id}/${transferManNumberTarget}`, { method: 'PATCH' })
          .then(response => resolve(response));
      }));

    }

    Promise.all(promises)
      .then((responses) => {
        console.log(responses);
        handleClose();
        fetch('http://localhost:3002/IssuedTools/')
          .then(response => response.json())
          .then(data => setRows(data))
      });
  }

  return (
    <Paper className={classes.IssuedTools} >
      <Grid container>
        <Grid className={classes.ToolMenu} item xs={12} md={6} >
          <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.ToolSearchTextField} placeholder='Search by Man# or Name'></TextField>
          <IconButton>
            <SearchIcon onClick={() => setFinalSearchValue(searchValue)} />
          </IconButton>
          <Button
            variant='outlined'
            disabled={selectedRows.length === 0}
            onClick={() => handleOpen()}
          >
            Transfer Tools</Button>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.Modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.ModalPaper}>
              <h2 id="transition-modal-title">Transfer To Man#: </h2>
              <TextField onChange={(event) => setTransferManNumberTarget(event.target.value)} value={transferManNumberTarget} placeholder='Enter Target Man#'></TextField>
              <Button
                className={classes.ModalButton}
                variant='outlined'
                disabled={transferManNumberTarget === ''}
                onClick={() => { makeTransfer() }}
              >
                Transfer Tools</Button>
            </div>
          </Fade>
        </Modal>
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