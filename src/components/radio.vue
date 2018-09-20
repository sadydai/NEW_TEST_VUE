<template>
    <div>
        <label :class="wrapClasses">
            <span :class="radioClasses">
                <span :class="innerClasses"></span>
                <span :class="correctClasses"></span>
                <input
                    type="radio"
                    :class="inputClasses"
                    :disabled="disabled"
                    :checked="currentValue"
                    :name="groupName"
                    @change="change"
                    @focus="onFocus"
                    @blur="onBlur">
            </span>
        <slot>{{ label }}</slot>
    </label>
    </div>
</template>
<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator';
@Component
export default class Radio extends Vue{
    private prefixCls = 'gt-radio'
    @Prop({type:String})
    label!: '';
    @Prop({type:[String,Number]})
    groupName!: '';
    @Prop({type: Boolean})
    disabled!: false;
    get  wrapClasses(){
        return
    }
    get radioClasses() {
        return
    }

    get innerClasses(){
        return
    }
    get correctClasses(){
        return
    }
    get inputClasses(){
        return
    }
    change() {

    }
    onFocus(){

    }
    onBlur(){

    }


}
</script>
