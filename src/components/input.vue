<template>
    <div :class="WrapClass">
        <i :class="iconClass"></i>
        <input type="text" :class="inputClass" @focus="handleFocus($event.target.value)" @blur="handleBlur($event.target.value)" @change="handleChange($event.target.value)" :value="currentValue" @input="handelInput($event.target.value)"
            :placeholder="placeholder">
    </div>
</template>

<script lang="ts">
import { Vue, Emit, Prop, Watch, Component } from 'vue-property-decorator';
@Component
export default class Input extends Vue {
    private prefixCls = 'gt-input';
    // computed
    get WrapClass() {
        return `${this.prefixCls}-wrapper`;
    }
    get iconClass() {
        return `${this.prefixCls}-icon`;
    }
    get inputClass() {
        return `${this.prefixCls}-input`;
    }

    @Prop({ type: String, default: '' })
    value!: any;
    @Prop({ type: String, default: '' })
    placeholder!: String;

    private currentValue = this.value;

    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleFocus","onChange", "handleBlur","getChange", "handelInput", "handleChange"] }]    */
    @Emit('on-focus')
    handleFocus(event: any) {
    }
    /** on-change 事件在input失去焦点时触发 */
    @Emit('on-change')
    handleChange(event: any) {
    }
    @Emit('on-blur')
    handleBlur(event: any) {
        console.log('blur 表单');
        this.getFormBlur(this.currentValue);
    }
    @Emit('on-form-blur')
    getFormBlur(value: any) {
        console.log('表单焦点blur');
    }
    /** 输入触发 */
    @Emit('input')
    handelInput(event: any) {
        this.setCurrentValue(event);
    }
    setCurrentValue(value: any) {
        if (value === this.currentValue) return;
        this.currentValue = value;
    }
    @Watch('currentValue')
    onChange(val: any, oldVal: any) {
        this.setCurrentValue(val);
    }
}
</script>
<style lang="less">
@import '../assets/css/scap';
@import '../assets/css/color';

.gt-input-wrapper {
    display: inline-block;
    width: @input-width-base;
    position: relative;
    vertical-align: middle;
    line-height: normal;
}
.gt-input {
    &-icon {
        width: 40px;
        height: @input-height-base;
        font-size: 14px;
        text-align: center;
        position: absolute;
        right: 0px;
        z-index: 3;
    }
    &-input {
        display: inline-block;
        width: 100%;
        height: @input-height-base;
        line-height: @input-height-base;
        padding: 12px;
        border: 1px solid @input-border-base;
        background-color: white;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 3px;
    }
    &-input:hover {
        border-color: @input-border-hover;
    }
    &-input:focus {
        border-color: @input-border-active;
        outline: 0
    }
    &-icon + &-input {
        padding-right: 40px;
    }
}

</style>
