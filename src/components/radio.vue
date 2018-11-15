<template>
        <label :class="wrapClasses">
            <span :class="radioClasses">
                <span :class="innerClasses"></span>
                <span :class="correctClasses"></span>
                <input
                    type="radio"
                    :class="inputClasses"
                    :disabled="disabled"
                    :checked="currentValue"
                    :name="groupName"
                    @change="change"
                   >
            </span>
        <slot> <span>{{ label }}</span></slot>
        <i class="move-actives"></i>
    </label>
</template>
<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';
import { findComponentUpward } from '@/assets/js/assist';
@Component
export default class Radio extends Vue {
    private prefixCls = 'gt-radio'
    @Prop({ type: String })
    label!: '';
    @Prop({ type: [String, Number] })
    groupName!: '';
    @Prop({ type: Boolean })
    disabled!: false;
    @Prop({ type: [String, Number, Boolean] })
    value!: false;
    private currentValue = this.value;
    private parents = findComponentUpward(this, 'RadioGroup');
    private group: Boolean = false;
    private changeActive: boolean = false;

    get wrapClasses() {
        return [
            `${this.prefixCls}-wrapper`,
            {
                [`${this.prefixCls}-group-item`]: this.group,
                [`${this.prefixCls}-wrapper-checked`]: this.currentValue,
                [`${this.prefixCls}-wrapper-disabled`]: this.disabled,
                [`${this.prefixCls}-change`]: this.changeActive && this.currentValue,
            },
        ];
    }
    get radioClasses() {
        return [
            `${this.prefixCls}`,
            {
                [`${this.prefixCls}-checked`]: this.currentValue,
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ];
    }

    get innerClasses() {
        return [
            `${this.prefixCls}-inner`,
        ];
    }
    get correctClasses() {
        return `${this.prefixCls}-correct`;
    }
    get inputClasses() {
        return `${this.prefixCls}-input`;
    }
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["emitInput", "emitChange"] }]    */
    @Emit('input')
    emitInput(val:any) {

    }
    @Emit('on-change')
    emitChange(val: boolean) {
    }

    change(event:any) {
        if (this.disabled) { return false; }
        const checked = event.target.checked;
        this.currentValue = checked;
        this.emitInput(this.currentValue);
        if (this.group) {
            if (this.label !== undefined) {
                this.parents.change({
                    value: this.label,
                    checked: this.value,
                });
            }
        } else {
            this.emitChange(this.currentValue);
        }
        if (checked) {
            this.changeActive = true;
        } else { this.changeActive = false; }
    }
    updateValue() {
        this.currentValue = this.value;
    }

    mounted() {
        if (this.parents) {
            this.group = true;
        }
        if (this.group) {
            this.parents.updateValue();
        } else {
            this.updateValue();
        }
    }
}
</script>

<style lang="less">
@import '../assets/css/scap';
@import '../assets/css/color';
.gt-radio{
    display: inline-block;
    white-space: nowrap;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
     margin-right: @select-padding-left;
    &-wrapper{
        vertical-align: middle;
        display: inline-block;
        position: relative;
        white-space: nowrap;
        cursor: pointer;
        margin-right: @select-padding-left;
    }
    &-change .move-actives::after{
        animation: active-data .4s ease-in;
    }
    &-inner{
        display: inline-block;
        width: @radio-width-base + 2px;
        height: @radio-width-base + 2px;
        position: relative;
        background-color: white;
        border-radius: 50%;
        border: 1px solid @input-border-base;
        transition: all .2s ease-in-out;
        box-sizing: border-box;
        &::after{
            position: absolute;
            width: @radio-width-base + 2px;
            height: @radio-width-base + 2px;
            border-radius: 50%;
            display: table;
            border-top: 0;
            border-left: 0;
            content: ' ';
            // background-color: #2461F6;
            opacity: 0;
            transition: all 0.2s ease-in-out;
            // transform: scale(0);
        }
    }
    &-correct{
        width: 10px;
        height: 10px;
        border-radius: 10px;
        position: absolute;
        opacity: 0;
        transform: scale(0);
    }
    &-input{
        position: absolute;
        top:0;
        z-index: 0;
        opacity: 0;
        cursor: pointer;
    }
     &-checked .gt-radio-inner{
         border:2px solid #2461F6;
     }
    &-checked .gt-radio-inner:after{
        opacity: 1;
        transform: scale(1.1);
        transition: all .2s ease-in-out;
    }
    &-checked .gt-radio-correct{
        display: inline-block;
        z-index: 3;
        left: 5px;
        transition: all 0.2s 0.1s ease-in-out;
        opacity: 1;
        top: 5px;
        background-color: #2461F6;
        transform: scale(1);
    }
}
.move-actives{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    top:1px;
}
.move-actives::after{
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(157,181,248,.8);
    opacity: 0
}
@keyframes active-data {
    0% {
        -webkit-transform: scale(.2);
        transform: scale(.2);
        opacity: 1
    }

    50% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        opacity: .5
    }
    to {
        -webkit-transform: scale(1.7);
        transform: scale(1.7);
        opacity: 0
    }
}
</style>
