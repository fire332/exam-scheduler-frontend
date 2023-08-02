import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { AsyncBoundary } from '@rest-hooks/react';
import { Outlet } from '@tanstack/router';
import { LayoutGroup, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import Drawer from '../components/Drawer';
import FetchError from '../components/FetchError';
import LoadingSpinner from '../components/LoadingSpinner';
import NavItem from '../components/NavItem';
import UserBar from '../components/UserBar';

export default function Dashboard() {
  const { activeNavigator } = useAuth();
  const [expanded, setExpanded] = useState(false);
  if (activeNavigator === 'signoutRedirect') {
    // TODO
  }

  const handleBurgerClick = useCallback(
    () => setExpanded(!expanded),
    [expanded],
  );

  return (
    <LayoutGroup>
      <Drawer expanded={expanded} onBurgerClick={handleBurgerClick}>
        <NavItem
          expanded={expanded}
          shortText={'Schedule'}
          longText={'Schedule'}
          icon={CalendarIcon}
        />
        <NavItem
          expanded={expanded}
          shortText={'Requests'}
          longText={'Requests'}
          icon={EnvelopeClosedIcon}
        />
        <NavItem
          expanded={expanded}
          shortText={'Proctoring'}
          longText={'Proctoring'}
          icon={EyeOpenIcon}
        />
      </Drawer>
      <motion.div layout className="flex grow flex-col">
        <motion.div layout className="flex h-16 w-full justify-end">
          <UserBar />
        </motion.div>
        <motion.div
          layout
          className="grow rounded-tl-md bg-surface-50 px-8 text-surface-900"
        >
          <AsyncBoundary
            fallback={
              <div className="flex h-full items-center justify-center">
                <LoadingSpinner />
              </div>
            }
            errorComponent={FetchError}
          >
            <Outlet />
          </AsyncBoundary>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
