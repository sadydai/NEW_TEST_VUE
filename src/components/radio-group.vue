<template>
    <div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { findComponentsDownward } from '@/assets/js/assist';
@Component
export default class RadioGroup extends Vue {
    @Prop({ type: [String, Number] })
    value!:''

    private currentValue = this.value;
    private childrens = [];
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["emitChange"] }]    */
    @Emit('input')
    @Emit('on-change')
    emitChange(val:any) {
    }
    mounted() {
        this.updateValue();
    }
    updateValue() {
        this.childrens = findComponentsDownward(this, 'Radio');
        if (this.childrens) {
            this.childrens.forEach((child:any) => {
                child.currentValue = this.value === child.label;
                child.group = true;
            });
        }
    }
    change(data:any) {
        this.currentValue = data.value;
        this.updateValue();
        this.emitChange(data.value);
        // this.dispatch('FormItem', 'on-form-change', data.value);
    }
    @Watch('value')
    watchValue(val:any) {
        this.currentValue = this.value;
        this.updateValue();
    }
}
</script>
