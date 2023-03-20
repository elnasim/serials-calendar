import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminLoginView from "@/views/admin/AdminLoginView.vue";
import AdminSerialsView from "@/views/admin/AdminSerialsView.vue";
import AdminSerialCreateView from "@/views/admin/AdminSerialCreateView.vue";
import AdminSerialView from "@/views/admin/AdminSerialView.vue";
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
    component: AdminLoginView,
  },
  {
    path: pageRoutes.adminSingleSerialPage(":id"),
    name: "admin-serial",
    component: AdminSerialView,
  },
  {
    path: pageRoutes.adminSerialsPage(),
    name: "admin-serials",
    component: AdminSerialsView,
  },
  {
    path: pageRoutes.adminSerialCreatePage(),
    name: "admin-serial-create",
    component: AdminSerialCreateView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
