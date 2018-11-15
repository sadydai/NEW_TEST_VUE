<template>
    <div :class="WrapClass">
        <i :class="iconClass" v-if="Icon"></i>
        <input :type="type" :class="inputClass" @focus="handleFocus($event.target.value)" @blur="handleBlur($event.target.value)"
                @change="handleChange($event.target.value)" :value="currentValue" @input="handleInput($event.target.value)"
            :placeholder="placeholder" :id="inputId" :disabled="disabled">
        <label :for="inputId" v-if="label">{{label}}</label>
    </div>
</template>

<script lang ="ts">
import { Vue, Emit, Prop, Watch, Component } from 'vue-property-decorator';

let seet = 0;
const now = Date.now();
@Component
export default class Input extends Vue {
    private prefixCls = 'gt-input';
    private inputId = `inputId_${now}_${seet++}`
    // computed
    get WrapClass() {
        return [
            `${this.prefixCls}-wrapper`,
            { [`${this.prefixCls}-has-label`]: !!this.label },
        ];
    }
    get iconClass() {
        return `${this.prefixCls}-icon`;
    }
    get inputClass() {
        return [
            `${this.prefixCls}-input`,
            { [`${this.prefixCls}-disabled`]: this.disabled },
        ];
    }
    @Prop({ type: String, default: '' })
    value!: any;
    @Prop({ type: String, default: '' })
    placeholder!: String;
    @Prop({ type: String, default: '' })
    label!: string;
    @Prop({ type: Boolean, default: false })
    disabled!:boolean
    @Prop({ type: String, default: '' })
    Icon!:string
    @Prop({ type: String, default: 'text' })
    type!:string

    private currentValue = this.value;
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleFocus","getFormBlur", "getInput","getChange", "handelInput", "handleChange"] }]    */
    @Emit('on-focus')
    handleFocus(event: any) {

    }
    /** on-change 事件在input失去焦点时触发 */
    @Emit('on-change')
    handleChange(event: any) {
        this.setCurrentValue(event);
    }
    @Emit('on-blur')
    handleBlur(event: any) {
        this.getFormBlur(this.currentValue);
        this.dispatch('FormItem', 'on-form-blur', this.currentValue);
    }
    getFormBlur(value: any) {
    }
    /** 输入触发 */
    @Emit('input')
    getInput(event:any) {
    }
    handleInput(event: any) {
        this.getInput(event);
        this.setCurrentValue(event);
    }
    setCurrentValue(value: any) {
        if (value === this.currentValue) return;
        this.currentValue = value;
        this.dispatch('FormItem', 'on-form-change', value);
    }
    @Watch('currentValue')
    onChange(val: any, oldVal: any) {
        this.setCurrentValue(val);
    }
    dispatch(componentName :string, eventName:string, params:any) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;

            if (parent) {
                name = parent.$options.name;
            }
        }
        if (parent) {
            parent.$emit(eventName, params);
        }
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
    label{
        display: inline-block;
        margin-bottom: @label-base;
        font-weight: 500;
        line-height: @label-font;
        font-size: @label-font;
        position: absolute;
        left: 0;
        top: -(@label-font + @label-base);
    }
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
        // height: @input-height-base;
        // line-height: @input-height-base;
        padding: 12px;
        border: 1px solid @input-border-base;
        background-color: white;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
    }
    &-input:hover {
        border-color: @input-border-hover;
    }
    &-input:focus {
        border:2px solid @input-border-active;
        outline: 0;
        padding: 11px 12px;
    }
    &-input:focus + label{
        color: @input-border-active;
    }
    &-disabled{
        background-color: @disabled-bg;
        border: 1px solid @disbaled-border;
        cursor: not-allowed;
    }
    &-has-label{
        margin-top: @label-font + @label-base;
    }
    &-icon + &-input {
        padding-right: 40px;
    }
}

</style>
