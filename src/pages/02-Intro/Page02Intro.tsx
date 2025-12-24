import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box, // CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText, // DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { getDatabase, ref, set } from 'firebase/database';

import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import SkipButton from '@/components/SkipButton';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import fullscreen from '@/utils/fullscreen';

import clickSound from './../../components/Assets/click.mp3';
import MainVideo1 from '/assets/cs_pesquisa01.mp4';
import MainVideo2 from '/assets/cs_pesquisa02.mp4';
import MainVideo3 from '/assets/cs_pesquisa03.mp4';
import TitleImg from '/assets/title-screen-2.png';

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
  },
  boardContainer: {
    width: '90%',
    height: '66%',
    backgroundColor: '#500d54',
    padding: 30,
    borderRadius: 45,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    bottom: '4%',
    position: 'absolute',
    justifyContent: 'center',
  },
  button: {
    fontSize: '40px',
  },
  boxTitle: {
    width: '76%',
    height: 90,
    position: 'absolute',
    top: '7%',
    backgroundImage: `url("${TitleImg}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // backgroundColor: '#333333aa',
  },
  boxButton: {
    width: '90%',
    height: 160,
    borderRadius: 20,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  subContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 35,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  video1: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundImage: `URL(${MainVideo1})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#792b7e',
  },
  video2: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundImage: `URL(${MainVideo2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#792b7e',
  },
  video3: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundImage: `URL(${MainVideo3})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#792b7e',
  },
  modalContainer: {
    maxWidth: '60%',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'Din Extrabold',
    paddingBottom: 20,
  },
  textField: {
    fontSize: '2rem',
    fontFamily: 'Din Semibold',
    minHeight: 200,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#872186',
    margin: '20px 0 20px 0',
    borderRadius: 30,
    padding: 30,
    width: '100%',
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '60%',
    backgroundColor: '#872186',
    borderRadius: 30,
    padding: 30,
  },
}));

const BootstrapDialogActions = styled(DialogActions)(({ theme }) => ({
  '& .MuiDialogActions-root': {
    justifyContent: 'center',
  },
}));

// const BootstrapTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiInputBase-root': {
//     fontSize: '2rem',
//     fontFamily: 'Din Semibold',
//     minHeight: 200,
//     alignItems: 'flex-start',
//     backgroundColor: 'white',
//     color: '#872186',
//     margin: '20px 0 20px 0',
//     borderRadius: 30,
//     padding: 30,
//   },
//   '& .MuiFilledInput-root:before': {
//     borderBottom: 0,
//   },
//   '& .MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
//     borderBottom: 0,
//   },
//   '& .MuiFilledInput-root:hover': {
//     backgroundColor: 'white',
//     color: '#872186',
//   },
// }));

interface participation {
  id: string;
  timestemp_start: string;
  bundle: string;
  answer: string;
  video: number;
}

function Page1() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));
  const [showElement, setShowElement] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [restart, setRestart] = React.useState(true);
  const [opiniao, setOpiniao] = React.useState('');
  const [video, setVideo] = useState(0);
  useEffect(() => {
    audioRef.current.play();
    handleRestart();
  }, [video]);
  useEffect(() => {
    registerCheckinTotem();
    setTimeout(() => setShowElement(true), 1000);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRestart = () => {
    setRestart(false);
    setTimeout(() => setRestart(true), 200);
  };
  const registerCheckinTotem = async () => {
    const data = { id: 14 };
    const response = await fetch('https://api4.convencaoraizen2023.com.br/checkintotem/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRelease = () => {
    audioRef.current.play();
    setOpen(true);
    fullscreen();
  };
  const handleSubmit = () => {
    const dateNow = new Date();
    const userId = `${dateNow.getTime()}`;
    const request: participation = {
      id: userId,
      timestemp_start: dateNow.toISOString(),
      bundle: 'oba.csonline.pesquisa.participation',
      answer: opiniao,
      video: video + 1,
    };
    writeUserData(request);
    handleClose();
    setTimeout(() => navigate('/abertura'), 400);
  };
  async function writeUserData(request: participation) {
    console.log(request);
    const db = await getDatabase();
    const requestId = request.id;
    await set(ref(db, 'pesquisa/' + requestId), request);
  }
  return (
    <>
      <Meta title="Vídeo" />
      <FullSizeCenteredFlexBox className={classes.container}>
        <Box className={classes.boxTitle} />
        <FullSizeCenteredFlexBox className={classes.boardContainer}>
          <Box
            sx={{ width: '25%', alignItems: 'flex-start !important' }}
            className={classes.subContainer}
          >
            <Box
              sx={{
                backgroundImage: `URL(assets/button-select-01${video === 0 ? '-active' : ''}.png)`,
              }}
              className={classes.boxButton}
              onClick={() => setVideo(0)}
            />
            <Box
              sx={{
                backgroundImage: `URL(assets/button-select-02${video === 1 ? '-active' : ''}.png)`,
              }}
              className={classes.boxButton}
              onClick={() => setVideo(1)}
            />
            <Box
              sx={{
                backgroundImage: `URL(assets/button-select-03${video === 2 ? '-active' : ''}.png)`,
              }}
              className={classes.boxButton}
              onClick={() => setVideo(2)}
            />
          </Box>
          <Box
            sx={{ width: '75%', alignItems: 'flex-end !important' }}
            className={classes.subContainer}
          >
            <Box className={classes.boxVideo}>
              {video === 0 && (
                <video className={classes.video} autoPlay preload="auto" muted loop>
                  <source src={MainVideo1} type="video/mp4" />
                </video>
              )}
              {video === 1 && (
                <video className={classes.video} autoPlay preload="auto" muted loop>
                  <source src={MainVideo2} type="video/mp4" />
                </video>
              )}
              {video === 2 && (
                <video className={classes.video} autoPlay preload="auto" muted loop>
                  <source src={MainVideo3} type="video/mp4" />
                </video>
              )}
            </Box>
          </Box>
        </FullSizeCenteredFlexBox>
      </FullSizeCenteredFlexBox>
      <Box className={classes.buttonContainer}>
        {showElement && (
          <Slide
            direction="up"
            in={showElement}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 250, exit: 250 }}
          >
            <Button className={`initial-button ${classes.button}`} onClick={handleRelease}>
              Confirmar
            </Button>
          </Slide>
        )}
      </Box>
      <BootstrapDialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText className={classes.modalTitle}>
            Conta pra gente se faltou algum dado que você queria ver no CSonline, a partir dos
            abastecimentos do Shell Box.
          </DialogContentText>
          {/* <BootstrapTextField
            autoFocus
            multiline
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="filled"
            onChange={(value) => setOpiniao(value.target.value)}
          /> */}
          <textarea
            autoFocus
            id="name"
            onChange={(value) => setOpiniao(value.target.value)}
            className={classes.textField}
          />
        </DialogContent>
        <BootstrapDialogActions>
          <Button className={`initial-button ${classes.button}`} onClick={handleSubmit}>
            confirmar
          </Button>
        </BootstrapDialogActions>
      </BootstrapDialog>
      {restart && <RestartTimer delay={180} page="/abertura" />}
      <SkipButton next={'/abertura'} />
    </>
  );
}

export default Page1;
