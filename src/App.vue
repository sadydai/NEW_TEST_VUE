<template>
  <div id="app">
      <Heater></Heater>
      <Side></Side>
    <div id="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less">
@import "./assets/css/scap";

body{
    background-color: #F2F5FA;
    box-sizing: border-box;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
}
#app {
  color: #3B426B;
  box-sizing: border-box;
}
#container {
  padding: 30px;
  width: calc(100% - @side-width);
  margin-left: @side-width;
  box-sizing: border-box;
  padding-top: @header-height;
}
</style>
<script lang="ts">
import Vue from 'vue';
import Heater from '@/components/header.vue';
import Side from '@/components/side.vue';
import Cookies from 'js-cookie';
import { sensebotAuth } from '@/api/auth';
import { Encrypt, Decrypt } from '@/assets/js/crypt';
import { connect } from 'tls';

export default Vue.extend({
    components: {
        Heater,
        Side,
    },

    created() {
        sensebotAuth().then((res:any) => {
            if (res.data.status === 1) {
                const info = res.data.data;
                Cookies.set('user', info.loginname);
                Cookies.set('S_Level', Encrypt(info.level.toString()), { expires: 5 });
                const level = Cookies.get('S_Level') || '';
                console.log(Decrypt(level));
            } else {
                console.log('未登录');
            }
        });
    },

});
</script>

