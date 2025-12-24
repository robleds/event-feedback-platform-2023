// import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: 20,
    marginLeft: 90,
    position: 'absolute',
    top: 0,
    left: 0,
    float: 'left',
  },
});

export default function ReplayDialog() {
  const navigate = useNavigate();
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpen(false);
  // };

  const handleReplay = () => {
    navigate(0);
  };

  return (
    <div>
      <Button variant="outlined" color="warning" onClick={handleReplay} className={classes.button}>
        <ReplayIcon />
      </Button>
      {/* <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tem certerteza que deseja replay?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a aplicação vai voltar para tela inicial e todo processo não salvo será perdido.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="info" onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={handleSucess} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
