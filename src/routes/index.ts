import FlagIcon from '@mui/icons-material/Flag';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Page_00]: {
    component: asyncComponentLoader(() => import('@/pages/Setup')),
    path: '/',
    title: 'Setup',
    icon: PhonelinkSetupIcon,
  },
  [Pages.Page_01]: {
    component: asyncComponentLoader(() => import('@/pages/01-Abertura')),
    path: '/abertura',
    title: 'Abertura',
    icon: FlagIcon,
  },
  [Pages.Page_02]: {
    component: asyncComponentLoader(() => import('@/pages/02-Intro')),
    path: '/intro',
    title: 'Intro',
    icon: FlagIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  }
};

export default routes;
