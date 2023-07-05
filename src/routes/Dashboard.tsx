import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons';
import { Outlet } from '@tanstack/router';
import Drawer from '../components/Drawer';
import NavItem from '../components/NavItem';
import UserBar from '../components/UserBar';

export default function Dashboard() {
  return (
    <>
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
    </>
  );
}
