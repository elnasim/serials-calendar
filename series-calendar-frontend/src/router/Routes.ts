import type { MonthsEnum } from "@/modules/calendar/types";

class Routes {
  public homePage(): string {
    return "/";
  }

  public loginPage(): string {
    return "/login";
  }

  public registrationPage(): string {
    return "/registration";
  }

  public calendarPage(): string {
    return "/calendar";
  }

  public calendarPageWithQueryParams(month: MonthsEnum, year: number): string {
    return `/calendar?month=${month}&year=${year}`;
  }

  public userProfilePage(): string {
    return "/profile";
  }

  public adminSingleSerialPage(id: string): string {
    return `/admin/serials/${id}`;
  }

  public adminSerialsPage(): string {
    return "/admin/serials";
  }

  public adminSerialCreatePage(): string {
    return "/admin/serials/create";
  }
}

export const routes = new Routes();
