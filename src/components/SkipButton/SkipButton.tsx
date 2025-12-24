import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';

import fullscreen from '@/utils/fullscreen';

import clickSound from './../Assets/click.mp3';

const useStyles = makeStyles({
  button: {
    border: 0,
    fontFamily: 'Din Bold',
    fontSize: '26px',
    padding: '0',
    position: 'absolute',
    right: 40,
    top: 40,
  },
});

interface MyComponentProps {
  next: string;
  color?: string;
  tiny?: boolean;
  static?: boolean;
}

const SkipButton: React.FC<MyComponentProps> = (props: MyComponentProps) => {
  const audioRef = React.useRef(new Audio(clickSound));
  const classes = useStyles();
  const navigate = useNavigate();
  const handleRelease = () => {
    audioRef.current.play();
    setTimeout(() => navigate(props.next), 200);
    fullscreen();
  };
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setIsOpen(true), 4000);
  }, []);
  return (
    <div>
      {isOpen && (
        <Button
          className={classes.button}
          sx={{ color: props.color || '#FFF' }}
          onClick={handleRelease}
        >
          {!props.tiny && 'Pular'}
          <ArrowForwardIosIcon
            sx={{ color: `${props.color || '#FFF'} !important` }}
            className="arrow-initial-button"
          />
        </Button>
      )}
    </div>
  );
};

export default SkipButton;
