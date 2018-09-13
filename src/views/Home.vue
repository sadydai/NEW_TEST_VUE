<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h3>产品分流页</h3>
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
    HelloWorld,
    },

    })
export default class Home extends Vue {}
</script>
