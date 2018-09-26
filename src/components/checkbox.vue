<template>
        <label :class="wrapClasses">
            <span :class="radioClasses">
                <span :class="innerClasses"></span>
                <span :class="correctClasses"></span>
                <input
                    v-if="group"
                    type="checkbox"
                    :class="inputClasses"
                    :disabled="disabled"
                    :value="label"
                    :name="groupName"
                    @change="change"
                    v-model="model"
                   >
                <input
                v-else
                type="checkbox"
                :class="inputClasses"
                :disabled="disabled"
                :checked="currentValue"
                :name="groupName"
                @change="change"
                >
            </span>
        <slot> <span>{{ label }}</span></slot>
    </label>
</template>
<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';
import { findComponentUpward } from '@/assets/js/assist';
@Component
export default class Checkbox extends Vue {
    private prefixCls = 'gt-checkbox'
    @Prop({ type: String })
    label!: '';
    @Prop({ type: [String, Number] })
    groupName!: '';
    @Prop({ type: Boolean })
    disabled!: false;
    @Prop({ type: [String, Number, Boolean] })
    value!: false;
    private currentValue = this.value;
    private parent = findComponentUpward(this, 'CheckboxGroup');
    private group: Boolean = false;
    private model: Array<any> = [];

    get wrapClasses() {
        return [
            `${this.prefixCls}-wrapper`,
            {
                [`${this.prefixCls}-group-item`]: this.group,
                [`${this.prefixCls}-wrapper-checked`]: this.currentValue,
                [`${this.prefixCls}-wrapper-disabled`]: this.disabled,
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
            this.parent.change(this.model);
        } else {
            this.emitChange(this.currentValue);
        }
    }
    updateValue() {
        this.currentValue = this.value;
    }

    mounted() {
        if (this.parent) {
            this.group = true;
        }
        if (this.group) {
            this.parent.updateValue();
        } else {
            this.updateValue();
        }
    }
}
</script>

<style lang="less">
@import '../assets/css/scap';
@import '../assets/css/color';
.gt-checkbox{
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
    &-inner{
        display: inline-block;
        width: @radio-width-base;
        height: @radio-width-base;
        position: relative;
        background-color: white;
        border-radius: 50%;
        border: 1px solid @input-border-base;
        transition: all .2s ease-in-out;
        &::after{
            position: absolute;
            width: @radio-width-base;
            height: @radio-width-base;
            border-radius: 50%;
            display: table;
            border-top: 0;
            border-left: 0;
            content: ' ';
            background-color: #2461F6;
            opacity: 0;
            transition: all 0.2s ease-in-out;
            transform: scale(0);
        }
    }
    &-correct{
        position: absolute;
        background-image: url("data:image/png;base64,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");
        background-repeat: no-repeat;
        background-size: 100%;
        transform: translate(-2px,1px);
        opacity: 0;
    }
    &-input{
        position: absolute;
        top:0;
        z-index: 0;
        opacity: 0;
        cursor: pointer;
    }
     &-checked .gt-checkbox-inner{
         border:1px solid #2461F6;
     }
    &-checked .gt-checkbox-inner:after{
        opacity: 1;
        transform: scale(1.1);
        transition: all .2s ease-in-out;
    }
    &-checked .gt-checkbox-correct{
        width: 18px;
        height: 18px;
        display: inline-block;
        z-index: 3;
        background-size: 108%;
        left: 2px;
        transition: all 0.2s 0.1s ease-in-out;
        transform: translate(0px, -1px);
        opacity: 1;
    }
}
</style>
