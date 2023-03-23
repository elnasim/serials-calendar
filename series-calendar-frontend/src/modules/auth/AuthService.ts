import appAxios from "@/modules/common/axios";

class AuthService {
  public login(email: string, password: string) {
    return appAxios({
      method: "POST",
      url: `/auth/login`,
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
  }

  public registration(email: string, password: string) {
    return appAxios({
      method: "POST",
      url: `/auth/registration`,
      data: {
        email,
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
