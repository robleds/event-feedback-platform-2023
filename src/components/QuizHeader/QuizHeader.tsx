import { Box, Slide, Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import bgHeader from './assets/bg-header-quiz.jpg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    background: `#782778 url(${bgHeader}) no-repeat left 3% center`,
    backgroundSize: '80px',
    fontFamily: 'Din Bold',
    fontSize: '33px',
    textTransform: 'uppercase',
    color: '#fff',
    width: '90%',
    padding: '4% 0 3% 12%',
    borderRadius: '0 0 0 30px',
  },
});

export default function QuizHeader(props: { title: string }) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 250, exit: 250 }}
      >
        <Typography variant="h2" className={classes.title}>
          {props.title}
        </Typography>
      </Slide>
    </Box>
  );
}
