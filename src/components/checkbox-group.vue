<template>
    <div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { findComponentsDownward } from '@/assets/js/assist';
@Component
export default class CheckboxGroup extends Vue {
    @Prop({ type: Array })
    value!: ['']
    private currentValue = this.value;
    private childrens = [];
    @Emit('input')
    @Emit('on-change')
    emitChange(val:any) {
    }
    mounted() {
        this.updateValue();
    }
    updateValue() {
        this.childrens = findComponentsDownward(this, 'Checkbox');
        if (this.childrens) {
            const { value } = this;
            this.childrens.forEach((child:any) => {
                child.model = value;
                child.currentValue = value.indexOf(child.label) >= 0;
                child.group = true;
            });
        }
    }
    change(data:any) {
        this.currentValue = data;
        this.updateValue();
        this.emitChange(data);
        // this.dispatch('FormItem', 'on-form-change', data.value);
    }
    @Watch('value')
    watchValue(val:any) {
        this.updateValue();
    }
}
</script>
