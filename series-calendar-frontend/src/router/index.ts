import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminLogin from "@/views/admin/AdminLogin.vue";
import AdminSerials from "@/views/admin/AdminSerials.vue";
import AdminCreateSerial from "@/views/admin/AdminSerialCreate.vue";
import AdminSerial from "@/views/admin/AdminSerial.vue";
import CalendarView from "@/views/CalendarView.vue";
import BeforeEnter from "@/router/BeforeEnter";
import pageRoutes from "@/router/Routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: pageRoutes.homePage(),
    name: "home",
    component: HomeView,
    redirect: "/calendar",
    children: [],
  },
  {
    path: pageRoutes.calendarPage(),
    name: "calendar",
    component: CalendarView,
    beforeEnter: (to, from, next) => BeforeEnter.calendar(to, from, next),
  },
  {
    path: pageRoutes.adminLoginPage(),
    name: "admin-login",
    component: AdminLogin,
  },
  {
    path: pageRoutes.adminSingleSerialPage(":id"),
    name: "admin-serial",
    component: AdminSerial,
  },
  {
    path: pageRoutes.adminSerialsPage(),
    name: "admin-serials",
    component: AdminSerials,
  },
  {
    path: pageRoutes.adminSerialCreatePage(),
    name: "admin-serial-create",
    component: AdminCreateSerial,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
