import { User } from 'oidc-client-ts';
import type { AuthProviderProps } from 'react-oidc-context';

const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const onRemoveUser = () => {
  window.location.pathname = '/';
};

const authConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENTID,
  redirect_uri: window.location.origin,
  scope: 'openid profile email',
  monitorSession: true,
  monitorAnonymousSession: true,
  loadUserInfo: true,
  mergeClaims: true,
  onSigninCallback,
  onRemoveUser
} as const satisfies AuthProviderProps;

function getUser() {
  // TODO: sessionStorage might be the incorrect place to store the auth data
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${authConfig.authority}:${authConfig.client_id}`
  );

  return oidcStorage ? User.fromStorageString(oidcStorage) : null;
}

export { authConfig, getUser };
