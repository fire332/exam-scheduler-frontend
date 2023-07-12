import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { AsyncBoundary } from '@rest-hooks/react';
import { Outlet } from '@tanstack/router';
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
    [expanded]
  );

  return (
    <>
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
      <div className="flex grow flex-col">
        <div className="h-16 w-full">
          <UserBar />
        </div>

        <div className="grow rounded-tl-md bg-surface-50 px-8 text-surface-900">
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
        </div>
      </div>
    </>
  );
}
