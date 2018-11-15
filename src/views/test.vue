<template>
    <div>
        <h3>Test 页面</h3>
        <hr>
        <h3 id="input">input</h3>
        <div class="card">
            <Form :rules = "ruleValidate" ref="formValidate" :model="formValidate">
                <FormItem prop="email">
                    <Input @on-blur= "getData()" v-model="formValidate.email"  placeholder="this is placeholder" :label="'邮箱'"/>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="formValidate.password" placeholder="this is placeholder" :type="'password'"/>
                </FormItem>
                <FormItem prop="name">
                    <Input v-model="formValidate.name" placeholder="this is name" :disabled="true" :label="'姓名'"/>
                </FormItem>

                <FormItem prop="select">
                    <div>
                        <Select v-model="formValidate.select" :selectList="testList" @select="getSelect($event)" :label="'select选择'"></Select>
                    </div>
                </FormItem>
                <FormItem>
                    <a @click="Submit('formValidate')">提交</a>
                </FormItem>
            </Form>

            <div>
               <h3>radio</h3>
               <h4>radio单一使用</h4>
                <Radio label="test" v-model="value1" groupName='teste'></Radio>
                <h4>radio组合使用</h4>
                <RadioGroup v-model="value2">
                    <Radio label="label1"  groupName='test'></Radio>
                    <Radio label="label2"  groupName='test'></Radio>
                </RadioGroup>
            </div>
            <div>
                <h3>checkbox 单独使用</h3>
                <Checkbox label="checkbox03" v-model="value4"></Checkbox>
                <h3>checkbox 组合使用</h3>
                <CheckboxGroup v-model="value3">
                    <Checkbox label="checkbox01"></Checkbox>
                    <Checkbox label="checkbox02"></Checkbox>
                </CheckboxGroup>
               {{value3}}
            </div>
            <div>
                <h3>时间选择 单个</h3>
                <DatePicker :leftVal='start' @left-date= "getDate($event)"></DatePicker>
                <h3>时间选择 区间</h3>
                <DatePicker :leftVal='start' :rightVal='end' :isSingle="true"></DatePicker>
            </div>
            <br>

        </div>
        <div >
            <h2>分页</h2>
            <div @click="changePage()">更改totalpage 10</div>
            <Pagination :total='totalPageNum' :current="currentPage" ></Pagination>

        </div>
        <div class="line">
            <h2>button</h2>
            <GtButton :text="'确认'"></GtButton>
            <GtButton :text="'确认'" :color="'info'"></GtButton>
             <h2>Smail button</h2>
            <GtButton :text="'确认'" :color="'info'" :type="'smail'"></GtButton>
            <GtButton :text="'确认'"  :type="'smail'"></GtButton>
            <h2>disabled button</h2>
             <GtButton :text="'确认'" :color="'info'" :type="'smail'" :disabled="true"></GtButton>
            <GtButton :text="'确认'"  :type="'smail'" :disabled="true"></GtButton>
            <GtButton :text="'确认'"  :disabled="true"></GtButton>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/input.vue';
import Form from '@/components/form.vue';
import FormItem from '@/components/form-item.vue';
import Select from '@/components/select.vue';
import Radio from '@/components/radio.vue';
import RadioGroup from '@/components/radio-group.vue';
import Checkbox from '@/components/checkbox.vue';
import CheckboxGroup from '@/components/checkbox-group.vue';
import DatePicker from '@/components/datepick.vue';
import Pagination from '@/components/pagination.vue';
import GtButton from '@/components/button.vue';

@Component({
    components:{ Input, Form, FormItem, Select, Radio, RadioGroup, Checkbox, CheckboxGroup, DatePicker, Pagination, GtButton },
    })

export default class Test extends Vue {
    private value1: boolean = false;
    private value2: string = '';
    private value3: any = ['checkbox01'];
    private value4: Boolean = true;
    private modelData: any = 'tesr';
    private testList:Array<any> = ['test', 'list'];
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
        name: [
            { required: true, trigger: 'blur' },
        ],
        select: [
            { required: true, trigger: 'change' },
        ],
    }
    private formValidate = {
        email: '', password: '', select: '', name: '',
    }
    private start = new Date();
    private end = new Date();
    private totalPageNum: number = 20;
    private currentPage: number = 3;

    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["getData","getDate"] }]    */
    /* 测试blur  focus change input */
    getData() {
        console.log('on-blur');
    }
    // 时间
    getDate(e:Date) {
        // console.log(e)
    }
    changePage() {
        this.totalPageNum = 10;
        this.currentPage = 1;
    }

     private ruleType : boolean = false;
     Submit(name: any) {
         const parent: any = this.$refs[name];
         parent.validate((valid:any) => {
             //  if (valid) {

             //  } else {
             //      console.log('提交失败');
             //  }
         });
     }
     getSelect(e: any) {
         this.formValidate.select = e;
     }
}

</script>
<style lang="less">
    .card{
        width: 260px;
    }
    .line{
        height: 500px;
    }
</style>


