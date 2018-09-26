<template>
    <form><slot></slot></form>
</template>
<script lang="ts">
import { Vue, Prop, Watch, Component } from 'vue-property-decorator';


const prefixCls = 'gt-form';
@Component
export default class Form extends Vue {
    @Prop({ type: Object })
    rules: any;
    @Prop({ type: Object })
    model: any;
    private fields: Array<Object> = [];

    validate(callback:any) {
        return new Promise((resolve) => {
            let valid = true;
            let count = 0;
            this.fields.forEach((field :any) => {
                field.validate('', (errors:any) => {
                    if (errors) {
                        valid = false;
                    }
                    if (++count === this.fields.length) {
                        resolve(valid);
                        if (typeof callback === 'function') {
                            callback(valid);
                        }
                    }
                });
            });
        });
    }

    created() {
        this.$on('on-form-item-add', (field:any) => {
            if (field) this.fields.push(field);
            return false;
        });
    }
    @Watch('rules')
    rule(val:any) {
        this.validate(val);
    }
}

</script>
