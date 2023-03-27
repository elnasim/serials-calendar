import { appAxios } from "@/modules/common/axios";

class UserService {
  public async getProfile() {
    const { data } = await appAxios({
      method: "GET",
      url: "/users/profile",
    });

    return data;
  }
}

const userService = new UserService();
export default userService;
