import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AllBooks from '../views/AllBooks.vue';
import Categories from '../views/Categories.vue';
import Authors from '../views/Authors.vue';
import AuthorDetail from '../views/AuthorDetail.vue';
import BookDetail from '../views/BookDetail.vue';
import About from '../views/About.vue';

// Admin Views
import AdminLogin from '../views/admin/Login.vue';
import AdminDashboard from '../views/admin/Dashboard.vue';
import ManageBooks from '../views/admin/ManageBooks.vue';
import ManageAuthors from '../views/admin/ManageAuthors.vue';
import ManageCategories from '../views/admin/ManageCategories.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/books', name: 'AllBooks', component: AllBooks },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/authors', name: 'Authors', component: Authors },
    { path: '/authors/:id', name: 'AuthorDetail', component: AuthorDetail },
    { path: '/book/:id', name: 'BookDetail', component: BookDetail },
    { path: '/about', name: 'About', component: About },

    // Admin Routes
    { 
        path: '/admin', 
        redirect: '/admin/login'
    },
    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/books',
        name: 'ManageBooks',
        component: ManageBooks,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/authors',
        name: 'ManageAuthors',
        component: ManageAuthors,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/categories',
        name: 'ManageCategories',
        component: ManageCategories,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

// Navigation Guard
router.beforeEach((to, from, next) => {
    const isAdminMode = import.meta.env.VITE_ADMIN_MODE === 'true';
    const isAuthenticated = !!localStorage.getItem('admin_token');

    if (to.path.startsWith('/admin')) {
        if (!isAdminMode) {
            return next('/');
        }
        if (to.meta.requiresAuth && !isAuthenticated) {
            return next('/admin/login');
        }
    }
    next();
});

export default router;
