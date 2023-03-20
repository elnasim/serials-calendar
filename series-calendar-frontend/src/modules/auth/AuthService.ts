import appAxios from "@/modules/common/axios";

class AuthService {
  public login(username: string, password: string) {
    return appAxios({
      method: "POST",
      url: `/auth/login`,
      data: {
        username,
        password,
      },
      withCredentials: true,
    });
  }
}

const authService = new AuthService();
export default authService;
