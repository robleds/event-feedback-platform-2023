import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, Button, List, ListItem, Slide, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
// Firebase
import { getDatabase, ref, set } from 'firebase/database';

import fullscreen from '@/utils/fullscreen';

import clickSound from './../Assets/click.mp3';
import proccessSound from './../Assets/processing.mp3';
import './style.css';

const useStyles = makeStyles({
  icon: {
    color: '#e84256',
    fontSize: '40px',
  },
  title: {
    fontFamily: 'Din Heavy',
    fontSize: '36px',
    textTransform: 'uppercase',
    color: '#28c0dc',
    textAlign: 'center',
    margin: 0,
  },
  button: {
    fontFamily: 'Din Heavy',
    fontSize: '34px',
    position: 'absolute',
    bottom: 20,
  },
});

export default function Quiz() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [listSelected, setListSelected] = React.useState<number[]>([]);
  const audioClickRef = React.useRef(new Audio(clickSound));
  const audioProccessRef = React.useRef(new Audio(proccessSound));

  // const [isAuthorized, setIsAuthorized] = React.useState(false);
  async function writeUserData(request: any) {
    const db: any = await getDatabase();
    const requestId = request.id;
    await set(ref(db, 'participations/' + requestId), request);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    audioProccessRef.current.play();
    fullscreen();
    const getLocalData = (await localStorage.getItem('oba.csonline.game.participation')) || '';
    const participation = JSON.parse(getLocalData);
    const participationNew = {
      ...participation,
      timestemp_quiz: new Date().toISOString(),
      quizAnswers: listSelected,
    };
    await localStorage.setItem(participationNew.bundle, JSON.stringify(participationNew));
    await writeUserData(participationNew);
    navigate('/quiz-result');
  };

  const handleListSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    audioClickRef.current.play();
    const id = Number(event.target.id);
    const checked = event.target.checked;
    const newList: number[] = listSelected.map((item) => item);
    if (checked) {
      newList.push(id);
    } else {
      newList.splice(listSelected.indexOf(id), 1);
    }
    setListSelected(newList);
  };

  // const checkLocalStorageData = async () => {
  //   const getLocalData = await localStorage.getItem('oba.csonline.game.participation') ||  '';
  //   const participation = JSON.parse(getLocalData);
  //   if (!participation) {
  //     navigate('/pre-opiniao');
  //   }
  // };

  // React.useEffect(()=>{
  //   checkLocalStorageData();
  // }, []);

  const quizList = [
    'Preço praticado',
    'Dificuldade/demora no pagamento',
    'Falta de treinamento/conhecimento do frentista',
    'Abastecer volume acima do solicitado',
    'Abastecer produto não solicitado',
    'Mau atendimento',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 350, exit: 250 }}
      >
        <Box className="white-card">
          <Box sx={{ position: 'absolute', top: '0px', left: '50%', ml: '-25px' }}>
            <ThumbDownIcon className={classes.icon} />
          </Box>
          <Typography variant="h2" className={classes.title}>
            Escolha 3 Opções
          </Typography>
          <List className="checkbox__list">
            {quizList.map((item, index) => {
              return (
                <ListItem key={index} disablePadding className="checkbox__item">
                  <input
                    type="checkbox"
                    disabled={listSelected.length > 2 && !listSelected.includes(index)}
                    value={item}
                    id={`${index}`}
                    onChange={(evt) => handleListSelected(evt)}
                    className="checkbox__checkbox"
                    style={{ display: 'none' }}
                  />
                  <Slide
                    direction="up"
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ enter: 400 + index * 50, exit: 250 }}
                  >
                    <label htmlFor={`${index}`} className="checkbox__label">
                      {item}
                    </label>
                  </Slide>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Slide>
      <Slide
        direction="up"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 250 }}
      >
        <Button
          disabled={listSelected.length !== 3}
          className={`initial-button ${classes.button}`}
          type="submit"
        >
          Confirmar e revelar resultado
        </Button>
      </Slide>
    </form>
  );
}
