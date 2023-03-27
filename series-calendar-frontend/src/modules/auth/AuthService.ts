import { appAxios } from "@/modules/common/axios";

class AuthService {
  public login(email: string, password: string) {
    return appAxios({
      method: "POST",
      url: `/auth/login`,
      data: {
        email,
        password,
      },
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
    });
  }

  public validateAdmin() {
    return appAxios({
      method: "POST",
      url: `/auth/validate-admin`,
    });
  }
}

const authService = new AuthService();
export default authService;
