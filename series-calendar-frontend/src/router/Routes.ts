import type { MonthsEnum } from "@/modules/calendar/types";

class Routes {
  public homePage(): string {
    return "/";
  }

  public calendarPage(): string {
    return "/calendar";
  }

  public calendarPageWithQueryParams(month: MonthsEnum, year: number): string {
    return `/calendar?month=${month}&year=${year}`;
  }

  public adminLoginPage(): string {
    return "/admin/login";
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

const routes = new Routes();
export default routes;
