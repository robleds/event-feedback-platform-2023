import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import PackageJson from './../../../package.json';

function Setup() {
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen();
  };
  return (
    <>
      <Meta title="Setup" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">{`CSOnline Pesquisa v${PackageJson.version}`}</Typography>
        <Button
          to={`/abertura`}
          component={Link}
          variant="outlined"
          sx={{ mt: 4 }}
          size="small"
          color="warning"
          onClick={handleFullScreen}
        >
          ENTRAR
        </Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Setup;
