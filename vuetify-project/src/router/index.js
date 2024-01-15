// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/',
    component: () =>
        import('@/components/LoginScreen.vue'),
    meta: { title: 'Trabajo Pinia' }

},
{
    path: '/votacions/',
    component: () =>
        import('@/components/VotacionsScreen.vue'),
    meta: { title: 'Trabajo Pinia' }

},]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title';
    next();
});

export default router