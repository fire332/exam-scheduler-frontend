import { useAuth } from 'react-oidc-context';
import Button from './Button';

export default function UserBar() {
  const auth = useAuth();

  return (
    <div className="inline-block">
      <Button onClick={() => void auth.removeUser()}>Sign Out</Button>

      <div className="h-9 w-9 items-center justify-center rounded-full bg-surface-500">
        {auth.user?.profile.given_name}
      </div>
    </div>
  );
}
