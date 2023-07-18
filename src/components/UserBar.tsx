import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { useCallback } from 'react';
import { useAuth } from 'react-oidc-context';

export default function UserBar() {
  const auth = useAuth();
  const onClick = useCallback(() => {
    void auth.removeUser();
  }, [auth]);

  return (
    <div className="inline-flex items-center pr-6">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center outline-none">
            <div className="flex">
              <CaretDownIcon className="h-6 w-6" />
              <div className="pr-1">{auth.user?.profile.given_name}</div>
              <div className="pr-3">
                {auth.user?.profile.family_name
                  ? auth.user.profile.family_name
                  : ''}
              </div>
            </div>
            <button
              className="h-[43px] w-[43px] rounded-full bg-black"
              aria-label="user-bar"
            >
              <button className="h-10 w-10 rounded-full bg-surface-400 text-lg">
                {auth.user?.profile.given_name?.charAt(0)}
                {auth.user?.profile.family_name
                  ? auth.user.profile.family_name.charAt(0)
                  : ''}
              </button>
            </button>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
            sideOffset={5}
            collisionPadding={10}
          >
            <a onClick={onClick}>
              <DropdownMenu.Item className="group relative flex h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[30px] text-[14px] leading-none outline-none hover:bg-surface-200 data-[disabled]:pointer-events-none">
                <ExitIcon />
                <div className="pl-2">Sign Out</div>
              </DropdownMenu.Item>
            </a>
            <a>
              <DropdownMenu.Item className="group relative flex h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[30px] text-[14px] leading-none outline-none hover:bg-surface-200 data-[disabled]:pointer-events-none">
                <PersonIcon />
                <div className="pl-2">Account Settings</div>
              </DropdownMenu.Item>
            </a>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
