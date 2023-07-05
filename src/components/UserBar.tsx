import Button from './Button';

export default function UserBar() {
  // const { userData } = useAuth();

  //   {userData?.profile.preferred_username}

  return (
    <div className="inline-block">
      <Button>Logout</Button>

      <div className="h-9 w-9 items-center justify-center rounded-full bg-surface-500"></div>
    </div>
  );
}
