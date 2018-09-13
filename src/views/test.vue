<template>
    <div>
        <h3>Test 页面</h3>
        <h4>
            表单样式测试
        </h4>
        <hr>
        <h3>input</h3>
        <Form :rules = "ruleValidate" ref="formValidate" :model="formValidate">
            <FormItem prop="email">
                <Input @on-blur= "getData()" v-model="formValidate.email" @on-focus="getF" @on-change="getC" @input="getI" placeholder="this is placeholder"/>
                <div @click="submit('formValidate')">
                    提交
                </div>
            </FormItem>
        </Form>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/input.vue';
import Form from '@/components/form.vue';
import FormItem from '@/components/form-item.vue';

@Component({
    components:{ Input, Form, FormItem },
    })

export default class Test extends Vue {
     private value1: string = '';
    private ruleValidate: Object = {
        email: [{ type: 'number', required: true, trigger: 'blur' }],
    }
    private formValidate: Object = { email: '' }

    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["getData"] }]    */
    /* 测试blur  focus change input */
    getData() {
        console.log('on-blur');
        console.log(this.value1);
    }
    getF() {
        console.log('this is focus');
        console.log(this.value1);
    }
    getC() {
        console.log('this is change');
        console.log(this.value1);
    }
    getI() {
        console.log('this is input');
        console.log(this.value1);
    }
     private ruleType : Boolean = false;
     submit(name: any) {
         //  this.$refs[name].validate((valid:any) => {
         //     console.log(valid)
         // })
     }
}
</script>

