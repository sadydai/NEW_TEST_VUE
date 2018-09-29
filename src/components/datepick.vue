<template>
    <div :class="[prefixCls]">
       <input type="text" @click="onInputLeftClick()" :value="inputLeftText" readonly>
       <input type="text" :value="inputRightText" readonly @click="onInputRightClick()" v-if="isSingle">
       <!-- left calendar -->
       <transition name= "drop">
            <div :class="[prefixCls + '-content']" v-if="isShowLeftCalendar">
                <div :class="[prefixCls + '-toolbar']">
                    <span class="toolbar-forword" @click="getForwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </span>
                    <div class="toolbar-time">{{currentYear}} {{currentMonth }}</div>
                    <span class="toolbar-backword"  @click="getBackwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </span>
                </div>
                <div :class="[prefixCls + '-week']">
                        <div v-for="days in daysName" :key="days" :class="[prefixCls + '-label']">{{days}}</div>
                </div>
                <div :class="[prefixCls + '-month-content']">
                    <div v-for="(day, index) in calendarDays" :key="index" :class="[prefixCls + '-month']">
                            <div class="datepicker-month-day" v-if="day!== 0" @click="chooseDate(day,true)" :class="{'current': isChooseDay(day,true),'forbidden': isForbidden(day,true)}">
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
       <!-- right calendar -->
       <transition name="drop" v-if="isSingle">
           <div v-if="isShowRightCalendar" :class="[prefixCls + '-content']">
               <div :class="[prefixCls + '-toolbar']">
                    <span class="toolbar-forword" @click="getForwordMonth()">
                        <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </span>
                    <div class="toolbar-time">{{currentYear}} {{currentMonth }}</div>
                    <span class="toolbar-backword"  @click="getBackwordMonth()">
                         <svg viewBox="0 0 24 24" class="page-svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </span>
                </div>
                <div :class="[prefixCls + '-week']">
                        <div v-for="days in daysName" :key="days" :class="[prefixCls + '-label']">{{days}}</div>
                </div>
                <div :class="[prefixCls + '-month-content']">
                    <div v-for="(day, index) in calendarDays" :key="index" :class="[prefixCls + '-month']">
                            <div class="datepicker-month-day" v-if="day!== 0" @click="chooseDate(day,false)"
                                :class="{'current': isChooseDay(day,false),'forbidden': isForbidden(day,false)}">
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
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';
import { Calendar } from '@/assets/js/calendar';
import { close, constants } from 'fs';
@Component
export default class DatePicker extends Vue {
    @Prop({ type: [Date, String] })
    rangeStart!: '';
    @Prop({ type: [Date, String] })
    rangeEnd!: '';
    @Prop({ type: [Date, String], default: new Date() })
    leftVal!: Date;
    @Prop({ type: [Date, String] })
    rightVal!:Date;
    @Prop({ type: Number })
    rangeMonth!: 100;
    @Prop({ type: Boolean })
    isSingle!:boolean;
    private prefixCls = 'datepicker'
    private startDate:any;
    private daysName= ['六', '一', '二', '三', '四', '五', '日'];
    private months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    private inputLeftText: string = '';
    private inputRightText: string = '';
    private calendar!: Calendar;
    private calendarDays: Array<Number> = [];
    private currentMonth: string = '';
    private currentYear: number = 0;
    private currentMonthNumber: number = 0;
    private isShowLeftCalendar: boolean = false;
    private leftDateVal = this.leftVal || new Date();
    private isShowRightCalendar: boolean = false;
    private rightDateVal = this.rightVal || new Date();
    private listener!: Function;

    constructor() {
        super();
        this.calendar = new Calendar();
        this.startDate = new Date();
        document.addEventListener('click', this.handleGlobalClick);
    }

    get leftDate() {
        return this.leftDateVal;
    }
    set leftDate(val: Date) {
        this.leftDateVal = val;
        this.dateLeftChange(val);
    }
    get rightDate() {
        return this.rightDateVal;
    }
    set rightDate(val: Date) {
        this.rightDateVal = val;
        this.dateRightChange(val);
    }
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["dateLeftChange", "dateRightChange", "isCurrentDay"] }]    */
    @Emit('left-date')
    dateLeftChange(val: Date) {
    }
    @Emit('right-date')
    dateRightChange(cal: Date) {}



    onInputLeftClick() {
        this.isShowLeftCalendar = !this.isShowLeftCalendar;
        this.isShowRightCalendar = false;
        this.setLeftDate();
    }
    onInputRightClick() {
        this.isShowRightCalendar = !this.isShowRightCalendar;
        this.isShowLeftCalendar = false;
        this.setRightDate();
    }
    // 获取左侧monthday
    getCurrentValues(date: Date) {
        this.calendarDays = [];
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = this.calendarDays.concat.apply([], calendarArray);
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
        // }
    }
    setCurrentMonth(monthNumber: number) {
        this.calendarDays = [];
        this.currentMonth = this.months[monthNumber];
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = this.calendarDays.concat.apply([], calendarArray);
    }
    chooseDate(date:Date, single: boolean) {
        if (single) {
            this.leftDate = date;
            this.setInputDate(date, true);
            this.isShowLeftCalendar = false;
            // this.isShowRightCalendar = true;
        } else {
            this.rightDate = date;
            this.setInputDate(date, false);
            this.isShowRightCalendar = false;
        }
    }

    // 左侧设置时间
    setInputDate(date:Date, single: boolean) {
        let month: string =(date.getMonth() + 1).toString();
        if (month.length <2) {
            month = `0${month}`;
        }
        let day: string = (date.getDate()).toString();
        if (day.length<2) { day = `0${day}`; }
        const inputText:string = `${date.getFullYear()}-${month}-${day}`;
        if (single) {
            this.inputLeftText = inputText;
        } else {
            this.inputRightText = inputText;
        }
    }
    setLeftDate() {
        if (this.leftDate) {
            this.setInputDate(this.leftDate, true);
            this.getCurrentValues(this.leftDate);
        } else {
            this.inputLeftText = '';
            this.getCurrentValues(new Date());
        }
    }
    setRightDate() {
        if (this.rightDate) {
            this.setInputDate(this.rightDate, false);
            this.getCurrentValues(this.rightDate);
        } else {
            this.inputRightText = '';
            this.getCurrentValues(new Date());
        }
    }
    isCurrentDay(day: Date) {
        if (day) {
            return day.toDateString() === new Date().toDateString();
        }
        return false;
    }
    // 是否被选中
    isChooseDay(day: Date, single: boolean) {
        if (single) {
            if (day && this.leftDate) {
                return day.toDateString() === this.leftDate.toDateString();
            }
        } else if (day && this.rightDate) {
            return day.toDateString() === this.rightDate.toDateString();
        }
    }
    isForbidden(date: Date, single: boolean) {
        const NOW = new Date().getTime();
        if (single) {
            if (date) {
                if (date.getTime() > NOW || date.getTime() > this.rightDate.getTime()
                    || date.getTime() < (NOW - (this.rangeMonth * 86400000))) {
                    return true;
                }
            } else {
                return false;
            }
        } else if (date) {
            if (date.getTime() > NOW || date.getTime() < this.leftDate.getTime()) {
                return true;
            }
        } else {
            return false;
        }
    }
    handleGlobalClick(e:any) {
        if (this.$el) {
            if (!this.$el.contains(e.target)) {
                this.isShowLeftCalendar = false;
                this.isShowRightCalendar = false;
                this.setLeftDate();
                this.setRightDate();
            }
        }
    }
    created() {
        this.setLeftDate();
        this.setRightDate();
    }
    beforeDestory() {
        document.removeEventListener('click', this.handleGlobalClick);
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
    z-index: 11;
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
        display: inline-block;
        max-width: 100px;
        color: @input-font-base;
        padding-left: @select-padding-left;
        border: none;
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
    &-month-day:hover, &-month-day.current{
        .day-button{
            transform: scale(1);
            opacity: 1;
            transition: all .45s cubic-bezier(.23,1,.32,1);
        }
        .day-text{
            color: white;
        }
    }
    &-month-day.forbidden{
        cursor:not-allowed;
        pointer-events: none;
        color:silver
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
</style>
