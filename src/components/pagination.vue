<template>
    <div>
        <div  @click="handleClick('back')" :class="pageNormalLeftCls">
            <svg viewBox="0 0 24 24" class="page-svg">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
        </div>
        <div  :class="{active: currentPage === 1, [`${prefixCls}-normal`]:true}" @click="handleClick(1)">1</div>
        <div v-if="totalPageCount > 5 && currentPage - 1 >= 4" :class="[`${prefixCls}-normal`]" class="dot"> ... </div>
        <div v-for ="(item, index) in pageList" :key="index" @click="handleClick(item)"  :class="{active: currentPage === item, [`${prefixCls}-normal`]:true}">{{ item }}</div>
        <div v-if="totalPageCount > 5 && totalPageCount - currentPage >= 4" :class="[`${prefixCls}-normal`]" class="dot">...</div>
        <div  @click="handleClick(totalPageCount)" :class="{active: currentPage === totalPageCount, [`${prefixCls}-normal`]:true}" v-if="totalPageCount !== 1">{{ totalPageCount }}</div>
        <div @click="handleClick('forward')" :class="pageNormalRightCls">
            <svg viewBox="0 0 24 24" class="page-svg">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
@Component
export default class Pagination extends Vue {
    @Prop()
    current!:number;
    @Prop()
    total!:number;
    private prefixCls = 'pagenation'
    private totalPageCount: number = this.total || 20;
    private currentPage: number = this.current || 1;
    private pageList: Array<any> = [];
    private leftDisable: boolean = false;
    private rightDisable: boolean = false;
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["pageChange"] }]    */
    @Emit('pageChange')
    pageChange(val:number) {
    }
    get pageNormalLeftCls() {
        return [
            `${this.prefixCls}-normal`,
            { [`${this.prefixCls}-disable`]: this.leftDisable },
        ];
    }
    get pageNormalRightCls() {
        return [
            `${this.prefixCls}-normal`,
            { [`${this.prefixCls}-disable`]: this.rightDisable },
        ];
    }
    handleClick(e: any) {
        if (typeof e === 'number') {
            if (this.currentPage === e) {
                return;
            }
            this.currentPage = e;
            this.pageList = this.calcPageList(e);
        } else {
            switch (e) {
            case 'back':
                this.currentPage = Math.max(1, this.currentPage - 1);
                this.pageList = this.calcPageList(this.currentPage);
                break;
            case 'forward':
                this.currentPage = Math.min(this.totalPageCount, this.currentPage + 1);
                this.pageList = this.calcPageList(this.currentPage);
                break;
            }
        }
    }
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

    calcPageList(current: number) {
        const pageList = [];
        if (this.totalPageCount > 5) {
            let left = Math.max(2, current - 2);
            let right = Math.min(current + 2, this.totalPageCount - 1);
            if (current - 1 < 2) {
                right = 4;
            }
            if (this.totalPageCount - current < 2) {
                left = this.totalPageCount - 3;
            }

            for (let i = left; i <= right; i++) {
                pageList.push(i);
            }
        } else {
            for (let i = 2; i < this.totalPageCount; i++) {
                pageList.push(i);
            }
        }
        this.iconIsDisabled();
        this.pageChange(this.currentPage);
        return pageList;
    }
    iconIsDisabled() {
        this.leftDisable = this.currentPage === 1;
        this.rightDisable = this.currentPage === this.totalPageCount;
    }
    initPagination() {
        this.pageList = this.calcPageList(this.currentPage);
    }
    created() {
        this.initPagination();
    }

    @Watch('total')
    pageTotal(val:any) {
        this.totalPageCount = val;
        this.initPagination();
    }
    @Watch('current')
    pageCurrent(val: number) {
        this.currentPage = val;
    }
}
</script>
<style lang="less">
@import '../assets/css/scap';
@import '../assets/css/color';
@prefixCls: ~'pagenation';

.@{prefixCls}-normal{
    display: inline-block;
    width: @page-item-size;
    height: @page-item-size;
    line-height: @page-item-size;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    margin: 0 4px;
    &:hover{
        background-color: fade(@color-base, 20%);
    }
    &.active{
        background-color: @base-blue;
        color: white;
    }
    &.dot{
        pointer-events: none;
    }
}
.@{prefixCls}-disable{
        pointer-events: none;
        color: fade(@color-base, 30%);
}

</style>

