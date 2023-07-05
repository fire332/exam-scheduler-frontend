import { useAuth } from 'oidc-react';
import Button from './Button';

export default function UserBar() {
  const { userData } = useAuth();
  console.log(userData?.profile);

  //   {userData?.profile.preferred_username}

  return (
    <div className="inline-block">
      <Button>Logout</Button>

      <div className="h-9 w-9 items-center justify-center rounded-full bg-surface-500"></div>
    </div>
  );
}
