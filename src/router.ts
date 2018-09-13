import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./views/test.vue'),
        },
        {
            path: '/sensebot',
            component: () => import('./views/sensebot/sensebot.vue'),
            children: [
                {
                    path: 'overview',
                    name: 'sensebot_overview',
                    component: () => import('./views/sensebot/overview.vue'),
                },
                {
                    path: 'data',
                    name: 'sensebot_data',
                    component: () => import('./views/sensebot/data.vue'),
                },
                {
                    path: 'manage',
                    name: 'sensebot_manage',
                    component: () => import('./views/sensebot/manage.vue'),
                },
                {
                    path: '',
                    component: () => import('./views/sensebot/overview.vue'),
                },
            ],

        },
        {
            path: '/onepass',
            component: () => import('./views/onepass/onepass.vue'),
            children: [
                {
                    path: 'overview',
                    name: 'onepass_overview',
                    component: () => import('./views/onepass/overview.vue'),
                },
                {
                    path: 'data',
                    name: 'onepass_data',
                    component: () => import('./views/onepass/data.vue'),
                },
                {
                    path: 'manage',
                    name: 'onepass_manage',
                    component: () => import('./views/onepass/manage.vue'),
                },
                {
                    path: '',
                    component: () => import('./views/onepass/overview.vue'),
                },
            ],

        },

    ],
});
