import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { routes } from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import authService from "@/modules/auth/AuthService";

export default class BeforeEnter {
  public static async calendar(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    const month = to.query.month;
    const year = to.query.year;

    if (month && year) {
      return next();
    }

    const date = new Date();
    const r = routes.calendarPageWithQueryParams(
      dateHelper.getMonthNameByIndex(date.getMonth()),
      date.getFullYear()
    );
    return next(r);
  }

  public static async validateAdmin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    try {
      await authService.validateAdmin();
      next();
    } catch (e) {
      next(routes.homePage);
    }
  }
}
