<template>
    <div class="header">
       <div class="header-logo">logo</div>
       <div class="header-right">user</div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    })
export default class Header extends Vue {}
</script>
<style lang="less">
@import "../assets/css/color";
@import "../assets/css/scap";

    .header{
        width: 100%;
        height: @header-height;
        color: @red_error;
        background-color: @base-blue;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        z-index: 12;
        position: fixed;
        &-logo{
            // display: inline-block;
            width: 150px;
            border: 1px solid;
            line-height: 60px;
            float: left;
            margin-left: @base-margin;
        }
        &-right{
            // display: inline-block;
            float: right;
            line-height: 60px;
            margin-right: @base-margin;
        }
    }
</style>

