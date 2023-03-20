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

  public validateAdmin() {
    return appAxios({
      method: "POST",
      url: `/auth/validate-admin`,
      withCredentials: true,
    });
  }
}

const authService = new AuthService();
export default authService;
