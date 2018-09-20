<template>
    <div class="side">
        <div>
            <div @click="toggle('button')"  class="side-menu">
                行为验证
            </div>
            <ul :class="{'side-hide': !sideBarMenu.button, 'side-show': sideBarMenu.button}">
                <li> <router-link to="/sensebot/overview">概览</router-link></li>
                <li><router-link to="/sensebot/data">数据统计</router-link></li>
                <li><router-link to="/sensebot/manage">管理设置</router-link></li>
            </ul>
        </div>
        <div >
            <div @click="toggle('onepass')" class="side-menu">
                验证onepass
            </div>
            <ul :class="{'side-hide': !sideBarMenu.onepass, 'side-show': sideBarMenu.onepass}">
                <li> <router-link to="/onepass/overview">概览</router-link></li>
                <li><router-link to="/onepass/data">数据统计</router-link></li>
                <li><router-link to="/onepass/manage">管理设置</router-link></li>
            </ul>
        </div>
        <div >
            <div @click="toggle('deepknow')" class="side-menu">
                深知
            </div>
            <ul :class="{'side-hide': !sideBarMenu.deepknow, 'side-show': sideBarMenu.deepknow}">
                <li>子3</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    })
export default class Header extends Vue {
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["changeMenu"] }]    */
    private sideBarMenu : any = { button: false, onepass: false, deepknow: false }
    toggle(e: any) {
        this.sideBarMenu[e] = !this.sideBarMenu[e];
        this.changeMenu(this.sideBarMenu, e);
    }
    changeMenu(e:any, t:any) {
        for (const key of Object.keys(e)) {
            if (t !== key) {
                e[key] = false;
            }
        }
    }
}
</script>
<style lang="less">
@import "../assets/css/color";
@import "../assets/css/scap";

    .side{
        width: @side-width;
        height: 100%;
        color: @red_error;
        background-color: #fff;
        position: fixed;
        box-shadow: 1px 0 6px 0 rgba(191, 200, 214, 0.12), 1px 0 4px 0 rgba(191, 200, 214, 0.31);
        overflow-y: auto;
        padding-bottom: 10px;
        z-index: 11;
        top: 0;
        padding-top: @header-height;
        color: @color-base;
        &-menu{
            cursor: pointer;
            height: 44px;
            line-height: 44px;
            text-align: center
        }

        ul{
            margin: 0;
        }
        .side-hide{
            max-height: 0;
            opacity: 0;
            visibility: hidden;
            transition: all 275ms cubic-bezier(0.4, 0, 0, 1)
        }
        .side-show{
            max-height: 400px;
            opacity: 1;
            transition: all 275ms cubic-bezier(0.4, 0, 0, 1)
        }
    }
</style>

