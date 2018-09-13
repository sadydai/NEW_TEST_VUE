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

    mounted() {
        this.$on('on-form-item-add', (fields:any) => {
            console.log(fields);
        });
    }
    created() {
        console.log('创建');
        // this.$on('on-form-item-add', (fields:any)=>{
        //     console.log(fields)
        // });
    }
}

</script>
