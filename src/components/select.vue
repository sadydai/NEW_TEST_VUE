<template>
    <div :class="wrapClass" @mouseleave="drop = false">
        <div @click="toggleDrop" :class="SelectClass">
                {{model}}
        </div>
        <label v-if="label" @click="toggleDrop">{{label}}</label>
         <transition name="drop" mode="in-out">
            <div :class="selectClass" v-if="drop">
                <ul>
                    <li v-for="option in selectList" :key="option" @click="select(option)" :class="{'select-active': model === option}">{{option}}</li>
                </ul>
            </div>
         </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';
@Component
export default class Select extends Vue {
    @Prop({ type: [String, Number, Array] })
    value!: '';
    @Prop({ type: Array })
    selectList!: Array<string>;
    @Prop({ type: String, default: '' })
    label!:string
    private drop:Boolean = false;
    private model = this.value;
    private prefixCls = 'select-selection'
    get selectClass() {
        return [
            `${this.prefixCls}-option`,
            { [`${this.prefixCls}-show`]: this.drop },

        ];
    }
    get wrapClass() {
        return [
            `${this.prefixCls}-content`,
            { [`${this.prefixCls}-has-label`]: this.label },
        ];
    }
    get SelectClass() {
        return [
            `${this.prefixCls}`,
            { [`${this.prefixCls}-active`]: this.drop },
        ];
    }
    toggleDrop() {
        this.drop = !this.drop;
    }
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["getSelect"] }]    */
    @Emit('select')
    getSelect(value:any) {
    }
    select(option: any) {
        this.model = option;
        this.drop = false;
        this.getSelect(this.model);
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/scap';
@import '../assets/css/color';
    .select-selection{
        width: 100%;
        height: @select-height-base;
        position: relative;
        padding: 10px 12px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid @border-base;
        background-color: white;
        font-size: 16px;
        cursor: pointer;
        &:focus{
            border: 2px solid @base-blue;
        }
        &-content{
            position: relative;
            width: @input-width-base;
            label{
                line-height: @label-font;
                margin-bottom: @label-base;
                display: inline-block;
                font-weight: 500;
                position: absolute;
                left: 0;
                top: -(@label-font + @label-base);
                width: 100%;
                &::after{
                    position: absolute;
                    content: '';
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTcgMTBsNSA1IDUtNXoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+");
                    cursor: pointer;
                    top: (@select-height-base + 24px)/2;
                    right: 8px;
                }
            }
        }
        &-active{
            border: 2px solid @base-blue;
            background-color: @select-bg-active;
            padding: 9px 12px;
            & + label{
                color: @base-blue;
            }
        }
        &-has-label{
            margin-top: @label-font + @label-base;
        }

        &-option{
            position: absolute;
            max-height: 200px;
            width: 100%;
            background-color: white;
            box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13);
            border-radius: 3px;
            transform-origin: center top 0px;
            top: @select-height-base;
            opacity: 0;
            z-index: 1;
            overflow-x: hidden;
            ul{
                padding: 0 4px;
                border-radius: 3px;
                transition: all .3s ease;
            }
            li{
                min-height: 20px;
                font-size: 12px;
                padding: 8px 16px;
                text-overflow: ellipsis;
                cursor: pointer;
                margin: 4px 0;
                font-weight: normal;
                opacity: .7;
                border-radius: 3px;
                transition: all .3s ease;
            }
            li:hover{
                background-color: @disabled-bg;
                opacity: 1;
            }
        }
        &-show{
            top: @select-height-base;
            opacity: 1;

        }


    }



    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

</style>

