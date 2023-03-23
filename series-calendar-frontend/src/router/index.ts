import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminSerialsView from "@/views/admin/AdminSerialsView.vue";
import AdminSerialCreateView from "@/views/admin/AdminSerialCreateView.vue";
import AdminSerialView from "@/views/admin/AdminSerialView.vue";
import CalendarView from "@/views/CalendarView.vue";
import BeforeEnter from "@/router/BeforeEnter";
import pageRoutes from "@/router/Routes";
import LoginView from "@/views/auth/LoginView.vue";
import RegistrationView from "@/views/auth/RegistrationView.vue";

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
    path: pageRoutes.registrationPage(),
    name: "registration",
    component: RegistrationView,
  },
  {
    path: pageRoutes.loginPage(),
    name: "login",
    component: LoginView,
  },
  {
    path: pageRoutes.adminSingleSerialPage(":id"),
    name: "admin-serial",
    component: AdminSerialView,
    beforeEnter: (to, from, next) => BeforeEnter.validateAdmin(to, from, next)
  },
  {
    path: pageRoutes.adminSerialsPage(),
    name: "admin-serials",
    component: AdminSerialsView,
    beforeEnter: (to, from, next) => BeforeEnter.validateAdmin(to, from, next)
  },
  {
    path: pageRoutes.adminSerialCreatePage(),
    name: "admin-serial-create",
    component: AdminSerialCreateView,
    beforeEnter: (to, from, next) => BeforeEnter.validateAdmin(to, from, next),
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
