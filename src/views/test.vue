<template>
    <div>
        <h3>Test 页面</h3>
        <h4>

        </h4>
        <hr>
        <h3 id="input">input</h3>
        <div class="card">
            <Form :rules = "ruleValidate" ref="formValidate" :model="formValidate">
                <FormItem prop="email">
                    <Input @on-blur= "getData()" v-model="formValidate.email"  placeholder="this is placeholder"/>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="formValidate.password" placeholder="this is placeholder"/>
                </FormItem>
                
                <FormItem prop="select">
                    <div>
                        <Select v-model="formValidate.select" :selectList="testList" @select="getSelect($event)"></Select>
                    </div>
                </FormItem>
                <FormItem>
                    <a @click="Submit('formValidate')">提交</a>
                </FormItem>
            </Form>

            <div>
                radio checkbox
                <Radio label="test"></Radio>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/input.vue';
import Form from '@/components/form.vue';
import FormItem from '@/components/form-item.vue';
import Select from '@/components/select.vue';
import Radio from '@/components/radio.vue'

@Component({
    components:{ Input, Form, FormItem, Select, Radio },
    })

export default class Test extends Vue {
    private value1: string = '';
    private modelData: any = 'tesr';
    private testList:Array<string> = ['qq', 'eee'];
    private ruleValidate: Object = {
        email: [
            {
                type: 'string', required: true, trigger: 'change', message: '不能为空',
            },
            { required: true, trigger: 'blur', message: '不能为空' },
        ],
        password: [
            { required: true, trigger: 'blur' },
        ],
        select:[
            { required: true, trigger: 'change' },
        ]
    }
    private formValidate = { email: '' , password: '' , select: ''}

    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["getData"] }]    */
    /* 测试blur  focus change input */
    getData() {
        console.log('on-blur');
    }

     private ruleType : Boolean = false;
     Submit(name: any) {
         this.$refs[name].validate((valid:any) => {
             //  if (valid) {

             //  } else {
             //      console.log('提交失败');
             //  }
         });
     }
     getSelect(e: any){
         this.formValidate.select = e;
     }
}

</script>
<style lang="less">
    .card{
        width: 260px;
    }
</style>


