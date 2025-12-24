import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Modal, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import fullscreen from '@/utils/fullscreen';

import clickSound from './../Assets/click.mp3';
import bgModal from './assets/bg-modal.jpg';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    background: `#772879 url(${bgModal}) no-repeat center center`,
    backgroundSize: '96%',
    padding: '156px 70px 50px',
    textAlign: 'center',
    borderRadius: '20px',
  },
  title: {
    fontFamily: 'Din Bold',
    fontSize: '70px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '-1px',
  },
  text: {
    fontFamily: 'Din Heavy',
    fontSize: '22px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    margin: 0,
  },
  button: {
    fontFamily: 'Din Bold',
    fontSize: '33px',
    lineHeight: '1',
    textTransform: 'uppercase',
    color: '#fff',
    backgroundColor: '#25c0d8',
    border: '0',
    padding: '6px 60px',
    borderRadius: '15px',
    marginTop: '60px',
    '&:hover': {
      backgroundColor: '#25c0d8',
    },
  },
});

export default function BasicModal() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const audioRef = React.useRef(new Audio(clickSound));
  const handleClose = () => {
    audioRef.current.play();
    setOpen(false);
    setTimeout(() => navigate('/novidades'), 500);
    fullscreen();
  };
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box className={classes.container}>
          <Typography id="modal-modal-title" component="h2" className={classes.title}>
            Você sabia?
          </Typography>
          <Typography id="modal-modal-description" paragraph={true} className={classes.text}>
            Você pode consultar as reclamações do seu
            <br />
            posto na página meu negócio, do portal csonline?
          </Typography>
          <Button className={classes.button} onClick={handleClose}>
            Ok
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
