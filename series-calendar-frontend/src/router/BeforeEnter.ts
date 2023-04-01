import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { routes } from "@/router/Routes";
import dateHelper from "@/modules/common/helpers/DateHelper";
import authService from "@/modules/auth/AuthService";
import { useAuthStore } from "@/modules/auth/useAuthStore";

export default class BeforeEnter {
  public async calendar(
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

  public async validateAdmin(
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

  public profile(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    const { isAuth } = useAuthStore();

    if (isAuth) {
      return next();
    }

    return next(routes.calendarPage());
  }
}

export const beforeEnter = new BeforeEnter();
