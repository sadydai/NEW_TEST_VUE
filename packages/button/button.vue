<template>
    <div :class="btnClass">
        {{text}}
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class GtButton extends Vue {
@Prop({ type: String, default: '' })
text!:string
@Prop({ type: String, default: 'normal' })
type!: string
@Prop({ type: String, default: 'primary' })
color!: string
@Prop({ type: Boolean, default: false })
disabled!: boolean
private prefixCls = 'gt-botton'
get btnClass() {
    return [
        `${this.prefixCls}`,
        `${this.prefixCls}-${this.type}`,
        `${this.prefixCls}-${this.color}`,
        { [`${this.prefixCls}-disabled`]: this.disabled },
    ];
}
}
</script>
<style lang="less" scoped>
@import '../assets/css/scap';
@import '../assets/css/color';
    .gt-botton{
        display: inline-block;
        border-radius: 3px;
        font-weight: 600;
        cursor: pointer;
        margin-right: 18px;
        &-normal{
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 44px;
            transition:  all .2s ease-in;
            box-shadow: 0 2px 3px 0 rgba(44,71,146,.32), 0 -1px 1px 0 rgba(44,71,146,.1);
        }
        &-primary{
            background:linear-gradient(180deg,#648cff,#3973ff);
            color: white;
        }
        &-primary:hover{
            opacity: .9;
            box-shadow: none;
        }
        &-info{
            background: linear-gradient(-180deg,#fff 8%,#f2f2f7 97%);
        }
        &-info:hover{
            background: linear-gradient(-180deg,#f2f2f7 20%,#f2f2f7 97%);
            color: @base-blue;
            box-shadow: none
        }
        &-smail{
            width: 64px;
            height: 30px;
            font-size: 13px;
            line-height: 30px;
            text-align: center
        }
        &-disabled&-info, .gt-botton-disabled&-info:hover{
            cursor: not-allowed;
            background: rgba(216,221,230,.8) !important;
            color: white !important;
            box-shadow: none;
            pointer-events: none;
        }
        &-disabled&-primary, .gt-botton-disabled&-primary:hover{
            cursor: not-allowed;
            background: #b0c7ff !important;
            color: white !important;
            box-shadow: none;
            pointer-events: none;
        }

    }

</style>
