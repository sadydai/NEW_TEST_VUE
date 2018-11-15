import GtButton from './components/button.vue';

const Components ={
    GtButton,
};
// eslint-disable-next-line func-names
const install = function (Vue) {
    Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key]);
    });
    retina();
};
if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

export default {
    install,
};
export { install };

// export default
