//InShaAllah

import { createRouter, createWebHashHistory } from 'vue-router';
import WorkoutPage from '../views/WorkoutPage.vue';
import LoginView from '../views/LoginView.vue';
import { getSession } from '@/model/session';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: WorkoutPage,
      beforeEnter: requireLogin
    },
    {
      path: "/FriendsActivity",
      name: "friends",
      component: () => import("../views/FriendsView.vue"),
      beforeEnter: requireLogin
    },
    {
      path: "/UserAdminView",
      name: "admin",
      component: () => import("../views/userAdminView.vue"),
      meta: { requireAdmin: true },
      beforeEnter: requireLogin
    },
    {
      path: "/LoginView",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/SignUpView",
      name: "SignUpView",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/SearchView",
      name: "SearchView",
      component: () => import("../views/SearchView.vue"),
      beforeEnter: requireLogin
    }

  ],
});

function requireLogin(to: import('vue-router').RouteLocationNormalized, from: import('vue-router').RouteLocationNormalized, next: import('vue-router').NavigationGuardNext) {
  const session = getSession();
  if (!session.user) {
    session.redirectUrl = to.fullPath;
    next('/LoginView');
  } else {
    next();
  }
}

function requireAdmin(to: import('vue-router').RouteLocationNormalized, from: import('vue-router').RouteLocationNormalized, next: import('vue-router').NavigationGuardNext) {
  const session = getSession();
  if (!session.user || session.user.role !== 'admin') {
    next();
  } else {
    next();
  }
}

// Global navigation guard :)
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAdmin) {
//     requireAdmin(to, from, next);
//   } else {
//     next();
//   }
// });

export default router;
