import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons';
import { Outlet } from '@tanstack/router';
import {
  AuthProvider,
  useAuth,
  type AuthProviderProps
} from 'react-oidc-context';
import AuthdEndpoint from '../api/AuthdEndpoint';
import Drawer from '../components/Drawer';
import NavItem from '../components/NavItem';
import UserBar from '../components/UserBar';

const oidcConfig = {
  authority: 'https://fancy-runnable-unicorn-dfmpp0.zitadel.cloud/',
  client_id: '219095101232709889@exam-scheduler',
  redirect_uri: window.location.origin + '/dashboard/exam-requests',
  scope: 'openid profile email',
  monitorSession: true,
  monitorAnonymousSession: true,
  loadUserInfo: true,
  mergeClaims: true
} satisfies AuthProviderProps;

export default function Dashboard() {
  function onRender() {
    const auth = useAuth();
    AuthdEndpoint.accessToken = auth.user?.access_token;
    console.log('token now: ', AuthdEndpoint.accessToken);
  }

  return (
    <AuthProvider {...oidcConfig}>
      {onRender()}
      <Drawer>
        <NavItem shortText={'Schedule'} longText={''} Icon={CalendarIcon} />
        <NavItem
          shortText={'Requests'}
          longText={''}
          Icon={EnvelopeClosedIcon}
        />
        <NavItem shortText={'Proctoring'} longText={''} Icon={EyeOpenIcon} />
      </Drawer>

      <div className="flex grow flex-col">
        <div className="h-16 w-full">
          <UserBar></UserBar>
        </div>

        <div className="grow rounded-tl-md bg-white px-8 text-surface-900">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
