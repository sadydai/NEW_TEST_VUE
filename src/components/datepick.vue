<template>
    <div :class="[prefixCls]">
       <input type="text" @click="onInputLeftClick()" :value="inputLeftText" readonly>
       <!-- left calendar -->
       <transition name= "drop">
            <div :class="[prefixCls + '-content']" v-if="isShowLeftCalendar">
                <div :class="[prefixCls + '-toolbar']">
                    <span class="toolbar-forword" @click="getForwordMonth()">《</span>
                    <div class="toolbar-time">{{currentYear}} {{currentMonth }}</div>
                    <span class="toolbar-backword"  @click="getBackwordMonth()">></span>
                </div>
                <div :class="[prefixCls + '-week']">
                        <div v-for="days in daysName" :key="days" :class="[prefixCls + '-label']">{{days}}</div>
                </div>
                <div :class="[prefixCls + '-month-content']">
                    <div v-for="(day, index) in calendarDays" :key="index" :class="[prefixCls + '-month']">
                            <div :class="[prefixCls + '-month-day']" v-if="day!== 0" @click="chooseDate(day)">
                                <div class="day-button"></div>
                                <span class="day-text">{{day.getDate()}}</span>
                            </div>
                            <div v-if="day == 0" :class="[prefixCls + '-month-empty']">
                                <span>{{day}}</span>
                            </div>
                        </div>
                </div>
            </div>
       </transition>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Calendar } from '@/assets/js/calendar';
import { constants } from 'fs';
@Component
export default class DatePicker extends Vue {
    // @Prop({type:[Date, String]})
    private prefixCls = 'datepicker'
    private startDate:any;
    private daysName= ['六', '一', '二', '三', '四', '五', '日'];
    private months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    private inputLeftText: string = '';
    private calendar!: Calendar;
    private calendarDays: Array<Number> = [];
    private currentMonth: string = '';
    private currentYear: number = 0;
    private currentMonthNumber: number = 0;
    private isShowLeftCalendar: boolean = false;


    constructor() {
        super();
        this.calendar = new Calendar();
        this.startDate = new Date();
    }
    onInputLeftClick() {
        this.isShowLeftCalendar = !this.isShowLeftCalendar;
        this.getCurrentLeftValues(this.startDate);
    }
    // 获取左侧monthday
    getCurrentLeftValues(date: Date) {
        this.calendarDays = [];
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    getForwordMonth() {
        const currentMonth = this.currentMonthNumber;
        let newYear:number = this.currentYear;
        let newMonth: number;

        if (currentMonth === 0) {
            newYear = this.currentYear - 1;
            newMonth = 11;
        } else {
            newMonth = currentMonth - 1;
        }

        const newDate = new Date(newYear, newMonth);
        // if (!this.startDate || newDate.getTime() <= this.startDate.getTime()) {
        this.currentYear = newYear;
        this.currentMonthNumber = newMonth;
        this.setCurrentMonth(newMonth);
        // this.triggerAnimation('left');
        // }
    }
    getBackwordMonth() {
        const currentMonth = this.currentMonthNumber;
        let newYear:number = this.currentYear;
        let newMonth: number;

        if (currentMonth === 11) {
            newYear = this.currentYear + 1;
            newMonth = 0;
        } else {
            newMonth = currentMonth + 1;
        }
        const newDate = new Date(newYear, newMonth);
        // if (!this.startDate || newDate.getTime() >= this.startDate.getTime()) {
        this.currentYear = newYear;
        this.currentMonthNumber = newMonth;
        this.setCurrentMonth(newMonth);
        // this.triggerAnimation('left');
        // }
    }
    setCurrentMonth(monthNumber: number) {
        this.currentMonth = this.months[monthNumber];
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    chooseDate(date:Date) {
        console.log(date);
        this.setInputDate(date);
        this.isShowLeftCalendar = false;
    }

    // 左侧设置时间
    setInputDate(date:Date) {
        let month: string =(date.getMonth() + 1).toString();
        if (month.length <2) {
            month = `0${month}`;
        }
        let day: string = (date.getDate()).toString();
        if (day.length<2) { day = `0${day}`; }
        let inputText: string;
        inputText = `${date.getFullYear()}/${month}/${day}`;
        this.inputLeftText = inputText;
    }
}

</script>

<style lang="less" scoped>
@import '../assets/css/scap';
@import '../assets/css/color';

@prefixCls: ~'datepicker';

.@{prefixCls}-content {
    position: absolute;
    left: 0;
    top:@input-height-base;
    display: inline-block;
    width: @datepicker-width-base;
    background-color: white;
    width: 310px;
    min-height: 300px;
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 4px;
    transform-origin: center top 0px;
    .@{prefixCls}-toolbar{
        height: 48px;
        line-height: 48px;
        text-align: center;
    }
    .@{prefixCls}-week{
        height: 20px;
        line-height: 20px;
        opacity: .5;
    }
    .@{prefixCls}-label{
        display: inline-block;
        width: 42px;
        text-align: center;
    }
    .@{prefixCls}-month{
        display: inline-block;
        width: 42px;
        text-align: center;
        padding: 4px 0;
        position: relative;
        line-height: 24px;
        height: 34px;
        font-size: 12px;
        box-sizing: border-box;
        margin-bottom: 2px;
        transform-origin: center top 0px;

    }
}

.@{prefixCls}{
    input{
        height: @input-height-base;
        box-sizing: border-box;
    }
    position: relative;
    &-month-content{
        padding: 8px 0;
    }
    &-month-day{
        cursor: pointer;
        .day-text{
            position: relative;
        }
    }
    &-month-empty{
        span{
            opacity: 0;
            visibility: hidden;
        }
    }
    &-month-day:hover{
        .day-button{
            transform: scale(1);
            opacity: 1;
            transition: all .45s cubic-bezier(.23,1,.32,1);
        }
        .day-text{
            color: white;
        }
    }
}
.toolbar-time{
    width: 200px;
    display: inline-block;
}
.toolbar-forword, .toolbar-backword{
    display: inline-block;
    cursor: pointer;
}

.day-button{
    width: 34px;
    border-radius: 50%;
    background-color: @base-blue;
    height: 34px;
    position: absolute;
    left: 4px;
    top:0;
    opacity: 0;
    transform: scale(0);
    transition: all .45s cubic-bezier(.23,1,.32,1);
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
