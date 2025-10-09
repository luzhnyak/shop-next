import { useCallback } from "react";
import { useLogoutMutation } from "@/redux/auth/authApi";

// const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
// const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;

export const useAuthLogout = () => {
  const [logout] = useLogoutMutation();

  const authLogout = useCallback(() => {
    logout();
    // window.location.href = `https://${auth0Domain}/v2/logout?client_id=${clientId}&returnTo=${window.location.origin}`;
  }, [logout]);

  return authLogout;
};
