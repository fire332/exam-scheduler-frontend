import { Navigate } from '@tanstack/router';
import { useCallback } from 'react';
import { useAuth } from 'react-oidc-context';
import Button from '../components/ButtonHero';
import FICLogoColoured from '../components/FICLogo/FICLogoColoured';

function Index() {
  const auth = useAuth();

  const onClick = useCallback(() => void auth.signinRedirect(), [auth]);

  return (
    <div className="mx-auto max-w-lg ">
      <header className="flex h-32 w-full items-center">
        <FICLogoColoured height="48" />
      </header>

      <div className="prose my-8 text-center lg:prose-xl">
        <h3 className="!mb-0 text-surface-700">Exam Scheduling</h3>
        <h4 className="font-light text-surface-700">
          Schedule and apply to invigilate exams
        </h4>
      </div>

      <Button onClick={onClick}>SIGN IN</Button>
      {auth.isAuthenticated && <Navigate to="/scheduled-exams" />}
    </div>
  );
}

export default Index;
