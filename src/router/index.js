import HomeViews from "@/views/HomeViews.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/services/authService";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: { hideNav: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { hideNav: true },
  },
  {
    path: "/home",
    name: "home",
    component: HomeViews,
    meta:{requiredAuth : true}
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = authService.isAuthenticated();

  // 1. Accès à une page privée sans être connecté
  if (to.meta.requiredAuth && !loggedIn) {
    return next("/");
  }

  // 2. Accès à la page Login (ou Register) alors qu'on est déjà connecté
  // On ajoute "register" pour éviter qu'un utilisateur connecté puisse s'inscrire à nouveau
  if ((to.name === "login" || to.name === "register") && loggedIn) {
    return next("/home");
  }

  // 3. Dans tous les autres cas, on laisse passer
  next();
});

export default router;
