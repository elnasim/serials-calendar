import appAxios from "@/modules/common/axios";

class AuthService {
  public async login(username: string, password: string) {
    const res = await appAxios({
      method: "POST",
      url: `/auth/login`,
      data: {
        username,
        password,
      },
      withCredentials: true,
    });

    return res;
  }
}

const authService = new AuthService();
export default authService;
