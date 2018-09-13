<template>
    <div>
        <div>
            <slot></slot>
            <!-- <transition name="fade">
                <div>{{ validateMessage }}</div>
            </transition> -->
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Watch, Component, Emit } from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
    private prefixCls :string = 'gt-form-item';
    @Prop({ type: [Object, Array] })
    rules!: [Object, Array<Object>];
    @Prop({ type: Boolean })
    validateStatus!: Boolean;
    error: String = '';
    private validateState: string = '';
    private validateMessage: string = '';
    private validator: Object = {};
    private validateDisabled: boolean = false;
    onFieldBlur() {
        console.log('blur is active');
    }

    @Emit('on-form-item-add')
    getchange(this:any) {
        console.log('form-item-add');
    }
    mounted() {
        console.log('表单item  mounted');
        this.$on('on-form-blur', this.onFieldBlur);
    }
    created() {
        console.log(this);
        this.$on('on-form-blur', this.onFieldBlur);
    }

    beforeDestroy() {
    }
}

</script>
