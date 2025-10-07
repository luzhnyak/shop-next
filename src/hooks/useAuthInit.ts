import { useCurrentUserQuery } from "@/redux/auth/authApi";
import { selectAuthToken } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";

export const useAuthInit = () => {
  const token = useSelector(selectAuthToken);

  useCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !token,
  });
};
