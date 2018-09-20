<template>
    <div :class="contentClass">
        <div :class="contentStyle">
            <slot></slot>
            <transition name="fade">
                <div :class="[prefixCls + '-error-tip']">{{ validateMessage }}</div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
import AsyncValidator from 'async-validator';
import { Vue, Prop, Watch, Component, Emit } from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["getPropByPath"] }]    */
    private prefixCls :string = 'gt-form-item';
    @Prop({ type: [Object, Array] })
    rules!: [Object, Array<Object>];
    @Prop({ type: Boolean })
    validateStatus!: Boolean;
    error: String = '';
    @Prop({ type: String })
    prop!: String
    private validateState: string = '';
    private validateMessage: string = '';
    private validator: Object = {};
    private validateDisabled: boolean = false;
    onFieldBlur() {
        this.validate('blur');
    }
    onFieldChange() {
        this.validate('change');
    }
    getPropByPath(obj:any, paths:any) {
        let tempObj = obj;
        paths = paths.replace(/\[(\w+)\]/g, '.$1');
        paths = paths.replace(/^\./, '');

        const keyArr = paths.split('.');
        let i = 0;
        for (let len = keyArr.length; i < len - 1; ++i) {
            const key = keyArr[i];
            if (key in tempObj) {
                tempObj = tempObj[key];
            } else {
                throw new Error(' please transfer a valid prop path to form item!');
            }
        }
        return {
            o: tempObj,
            k: keyArr[i],
            v: tempObj[keyArr[i]],
        };
    }
    get contentStyle() {
        return [
            `${this.prefixCls}`,
            { [`${this.prefixCls}-error`]: this.validateState === 'error' },
        ];
    }
    get contentClass() {
        return [
            `${this.prefixCls}-content`,
            { [`${this.prefixCls}-content-error`]: this.validateState === 'error' },
        ];
    }
    get form() {
        let parent = this.$parent;
        while (parent.$options.name !== 'Form') {
            parent = parent.$parent;
        }
        return parent;
    }
    get fieldValue() {
        const model = this.form.model;
        if (!model || !this.prop) { return; }
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
            path = path.replace(/:/, '.');
        }
        const data = this.getPropByPath(model, path).v;
        return data;
    }
    getRules() {
        let formRules = this.form.rules;

        const selfRules = this.rules;

        formRules = formRules ? formRules[this.prop] : [];
        const r:any = selfRules || formRules || [];
        return [].concat(r);
    }
    getFilteredRule(trigger:any) {
        const rules = this.getRules();
        return rules.filter((rule:any) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    }
    validate(trigger:any, callback = function (err:any) {}) {
        const rules = this.getFilteredRule(trigger);
        const descriptor = {};
        descriptor[this.prop] = rules;

        const vali = new AsyncValidator(descriptor);
        const model = {};
        model[this.prop] = this.fieldValue;
        vali.validate(model, { firstFields: true }, (errors:any) => {
            this.validateState = !errors ? 'success' : 'error';
            this.validateMessage = errors ? errors[0].message : '';
            callback(this.validateMessage);
        });
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
    mounted() {
        Object.defineProperty(this, 'initialValue', {
            value: this.fieldValue,
        });
        this.$on('on-form-change', this.onFieldChange);
        this.$on('on-form-blur', this.onFieldBlur);
        this.dispatch('Form', 'on-form-item-add', this);
        const rules = this.getRules();
    }
    @Watch('errors')
    errors(val:any) {
        this.validateMessage = val;
        this.validateState = val === '' ? '' : 'error';
    }
}
</script>
<style lang="less">
@import '../assets/css/color';
.gt-form-item{
    // display: inline-block;
    position: relative;
    &-content{
        display: inline-block;
        position: relative;
        margin-bottom: 16px;
        transition: margin-bottom .2s ease;
        &-error{
            margin-bottom: 30px;
            transition: margin-bottom .2s ease;
        }
    }
    &-error{
        input {
            border-color: @red_error!important
        }
    }
    &-error-tip{
        text-align: right;
        font-size: 12px;
        color: @red_error;
        position: absolute;
        right: 0;
    }
}
</style>
