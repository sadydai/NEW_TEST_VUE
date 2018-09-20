import Vue from 'vue';
import Cookies from 'js-cookie';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    console.log(Cookies.get('session_id'));
    const isLogin = Cookies.get('session_id');
    if (!isLogin) {
        console.log('未登陆');
        window.location.href = 'https://auth.geetest.com/login/';
    } else {
        return next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
