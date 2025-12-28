import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout as logoutAction } from "../store/features/authSlice";
import { api } from "../store/services/api";
import { TokenService } from "../utils/token";
import { useRouter } from "next/navigation";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { accessToken, user, status } = useAppSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
    dispatch(api.util.resetApiState());
    TokenService.clear();
    router.push("/auth/login");
  };

  return {
    accessToken,
    user,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    logout,
  };
}
