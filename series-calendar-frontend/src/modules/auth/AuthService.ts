import { appAxios } from "@/modules/common/axios";
import type { AxiosResponse } from "axios";

class AuthService {
  public async login(email: string, password: string): Promise<AxiosResponse> {
    return appAxios({
      method: "POST",
      url: `/auth/login`,
      data: {
        email,
        password,
      },
    });
  }

  public registration(email: string, password: string): Promise<AxiosResponse> {
    return appAxios({
      method: "POST",
      url: `/auth/registration`,
      data: {
        email,
        password,
      },
    });
  }

  public async validateEmail(token: string): Promise<AxiosResponse> {
    return appAxios({
      method: "POST",
      url: "/auth/validate-email",
      data: {
        token,
      },
    });
  }

  public checkUser(): Promise<AxiosResponse> {
    return appAxios({
      method: "GET",
      url: `/auth/check-user`,
    });
  }

  public validateAdmin(): Promise<AxiosResponse> {
    return appAxios({
      method: "POST",
      url: `/auth/validate-admin`,
    });
  }
}

const authService = new AuthService();
export default authService;
