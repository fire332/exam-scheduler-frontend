import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { AsyncBoundary } from '@rest-hooks/react';
import { Outlet } from '@tanstack/router';
import { useAuth } from 'react-oidc-context';
import Drawer from '../components/Drawer';
import FetchError from '../components/FetchError';
import LoadingSpinner from '../components/LoadingSpinner';
import NavItem from '../components/NavItem';
import UserBar from '../components/UserBar';

export default function Dashboard() {
  const { activeNavigator } = useAuth();

  if (activeNavigator === 'signoutRedirect') {
    // TODO
  }

  return (
    <>
      <Drawer expanded={false}>
        <NavItem shortText={'Schedule'} longText={''} icon={CalendarIcon} />
        <NavItem
          shortText={'Requests'}
          longText={''}
          icon={EnvelopeClosedIcon}
        />
        <NavItem shortText={'Proctoring'} longText={''} icon={EyeOpenIcon} />
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
