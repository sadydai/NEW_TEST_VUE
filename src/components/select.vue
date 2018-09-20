<template>
    <div :class="[prefixCls + '-content']" @mouseleave="drop = false">
        <div @click="toggleDrop" :class="prefixCls" >
            {{model}}
        </div>
         <transition name="drop">
            <div :class="selectClass" v-if="drop" mode="in-out">
                <ul>
                    <li v-for="option in selectList" :key="option" @click="select(option)">{{option}}</li>
                </ul>
                </div>
         </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Emit} from 'vue-property-decorator';
@Component
export default class Select extends Vue {
    @Prop({ type: [String, Number, Array] })
    value!: '';
    @Prop({ type: Array })
    selectList!: Array<string>;
    private drop:Boolean = false;
    private model = this.value;
    private prefixCls = 'select-selection'
    get selectClass() {
        return [
            `${this.prefixCls}-option`,
            { [`${this.prefixCls}-show`]: this.drop},
        ];
    }
    toggleDrop() {
        this.drop = !this.drop;
    }
    @Emit('select')
    getSelect(value:any){
    }
    select(option: any) {
        this.model = option;
        this.drop = false;
        this.getSelect(this.model)
    }
    

}
</script>
<style lang="less" scoped>
@import '../assets/css/scap';
@import '../assets/css/animation';
    .select-selection{
        width: 100%;
        height: @select-height-base;
        position: relative;
        // line-height: @select-height-base;
        padding: @select-padding-left;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #eee;
        background-color: white;
        cursor: pointer;
        &-content{
            position: relative;
            width: @input-width-base;
        }
        &-option{
            position: absolute;
            max-height: 200px;
            width: 100%;
            background-color: white;
            box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13);
            border-radius: 3px;
            transform-origin: center top 0px;
            top: @select-height-base;
            opacity: 0;
            z-index: 1;
            overflow-x: hidden;
            li{
                min-height: 20px;
                font-size: 13px;
                padding: 4px 16px;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            li:hover{
                background-color: rgba(68, 136, 255, 0.05)
            }
        }
        &-show{
            top: @select-height-base;
            opacity: 1;
            
        }
        
    }
    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .drop-enter-active {
        animation: TransitionDropIn .3s ease-in-out;
    }
    
    .drop-leave-active{
        animation: TransitionDropOut .3s;
    }
    @keyframes TransitionDropIn {
        0% {
            opacity: 0;
            transform: scaleY(0.8);
        }
        100% {
            opacity: 1;
            transform: scaleY(1);
        }
    }

    @keyframes TransitionDropOut {
        0% {
            opacity: 1;
            transform: scaleY(1);
        }
        100% {
            opacity: 0;
            transform: scaleY(0.8);
        }
    }



</style>

