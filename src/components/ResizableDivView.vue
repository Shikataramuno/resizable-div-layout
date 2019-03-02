<template>
  <div id="resizeArea"
    ref="resizeArea"
    style="width: 1000px;"
    class="element">
    <div id="element1"
      ref="element1"
      style="width: 200px;"
      class="element">
      リサイズエリア１
    </div>
    <div id="resizerX"
      ref="resizerX"
      style="background: red;"
      draggable="true"
      @dragstart="xResizeStart"
      @dragend="xResizeEnd"
      @drag="xResize">
    </div>
    <div id="rightElements"
      ref="rightElements"
      style="width: 740px; height: 380px;"
      class="element">
      <div id="element2"
        ref="element2"
        style="height: 180px;"
        class="element">
        リサイズエリア２
      </div>
      <div id="resizerY"
        ref="resizerY"
        style="background: green;"
        draggable="true"
        @dragstart="yResizeStart"
        @dragend="yResizeEnd"
        @drag="yResize">
      </div>
      <div id="element3"
        ref="element3"
        style="height: 160px;"
        class="element">
        リサイズエリア３
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Resizer from '../util/Resizer';

@Component
export default class ResizableDivView extends Vue {
  name: string = 'ResizableDivView';
  previousX: number = 0;
  previousY: number = 0;
  $refs!: {
    'resizeArea': HTMLDivElement;
    'rightElements': HTMLDivElement;
    'element1': HTMLDivElement;
    'element2': HTMLDivElement;
    'element3': HTMLDivElement;
    'resizerXY': HTMLDivElement;
    'resizerX': HTMLDivElement;
    'resizerY': HTMLDivElement;
  };

  // 横方向のリサイズ
　// 各Elementの幅調整
  setElementsWidth(leftElementWidth: number): void {
    const padding: number = 30 + 30; // 左右5px
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const styleWidth: string = resizeArea!.style!.width!;
    const resizeAreaWidth: number = Number(styleWidth.substring(0, styleWidth.indexOf('px')));
    const rightElementsWidth: number = resizeAreaWidth - leftElementWidth - padding;

    const rightElements: HTMLElement = this.$refs.rightElements;
    rightElements.style.width = rightElementsWidth + 'px';

    const innerElementsWidth = rightElementsWidth - 30;
    const element2: HTMLDivElement = this.$refs.element2;
    element2.style.width = innerElementsWidth + 'px';
    const element3: HTMLDivElement = this.$refs.element3;
    element3.style.width = innerElementsWidth + 'px';
    const resizerY: HTMLDivElement = this.$refs.resizerY;
    resizerY.style.width = innerElementsWidth + 'px';
  }
  changeWidth(x: number): void {
    const element1: HTMLDivElement = this.$refs.element1;
    const styleWidth: string = element1!.style!.width!;
    const width: number = Number(styleWidth.substring(0, styleWidth.indexOf('px')));
    const xdev: number = x - this.previousX;
    element1.style.width = width + xdev + 'px';
    this.previousX = x;
    this.setElementsWidth(width + xdev);
  }
  // 縦方向のリサイズ
　// 各Elementの高さ調整
  setElementsHeight(el2Height: number): void {
    // topElements内の<div>をpaddingを考慮してtopElementsの高さに合わせる
    const padding: number = 30 + 25; // 上下5px
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const styleHeight: string = rightElements!.style!.height!;
    const rightElementsHeight: number = Number(styleHeight.substring(0, styleHeight.indexOf('px')));
    const innerElementsHeight: number = rightElementsHeight - el2Height - padding;
    console.log('element3.style.height : ' + innerElementsHeight);
    const element3: HTMLDivElement = this.$refs.element3;
    element3.style.height = innerElementsHeight + 'px';
  }
  changeHeight(y: number): void {
    const element2: HTMLDivElement = this.$refs.element2;
    const styleHeight: string = element2!.style!.height!;
    const height: number = Number(styleHeight.substring(0, styleHeight.indexOf('px')));
    const ydev: number = y - this.previousY;
    element2.style.height = height + ydev + 'px';
    this.previousY = y;
    this.setElementsHeight(height + ydev);
  }

  // ドラッグ＆ドロップのイベントハンドラー
  xResizeStart(e: MouseEvent): void {
    const resizerX: HTMLElement = this.$refs.resizerX;
    resizerX.style.background = '#000000';
    this.previousX = e.pageX;
  }
  xResizeEnd(e: MouseEvent): void {
    const resizerX: HTMLElement = this.$refs.resizerX;
    resizerX.style.background = 'red';
    this.previousX = 0;
  }
  xResize(e: MouseEvent): void {
    if (e.pageX) {
      this.changeWidth(e.pageX);
    }
  }
  yResizeStart(e: MouseEvent): void {
    const resizerY: HTMLElement = this.$refs.resizerY;
    resizerY.style.background = '#000000';
    this.previousY = e.pageY;
  }
  yResizeEnd(e: MouseEvent) {
    const resizerY: HTMLElement = this.$refs.resizerY;
    resizerY.style.background = 'green';
    this.previousY = 0;
  }
  yResize(e: MouseEvent): void {
    if (e.pageY) {
      this.changeHeight(e.pageY);
    }
  }

  // 初期表示
  mounted(): void {
    // this.setElementsHeight();
  }
}
</script>

<style scoped>
.element {
  border: 1px solid #999999;
  border-radius: 4px;
  margin: 5px;
  padding: 5px;
}
#resizeArea {
  /* width: 1000px; */
  height: 400px;
  /* overflow: auto; */
}
/* */
#element1 {
  height: 380px;
  float: left;
}
#resizerX {
  width: 10px;
  height: 380px;
  float: left;
  margin: 5px 0px;
  padding: 5px 0px;
  cursor: e-resize;
}
/* */
#rightElements {
  float: left;
}
#resizerY {
  height: 10px;
  margin: 0px 5px;
  padding: 0px 5px;
  cursor: n-resize;
}
</style>

