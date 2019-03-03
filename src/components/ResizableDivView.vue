<template>
  <div id="resizeArea"
    ref="resizeArea"
    class="element">
    <div id="element1"
      ref="element1"
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
      ref="rightElements">
      <div id="element2"
        ref="element2"
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
  padding: number = 5;
  margin: number = 5;
  border: number = 5;
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
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const resizeAreaWidth: number = resizeArea.clientWidth - 2 * this.padding;
    console.log('resizeAreaWidth : ' + resizeAreaWidth);

    const rightElementsWidth: number =
      resizeAreaWidth
      - (leftElementWidth + 2 * (this.margin + this.border + this.padding))　// element1
      - 10; // resizerX

    const rightElements: HTMLElement = this.$refs.rightElements;
    rightElements.style.width = rightElementsWidth + 'px';

    const innerElementsWidth = rightElementsWidth - 2 * (this.margin + this.border + this.padding);
    const element2: HTMLDivElement = this.$refs.element2;
    element2.style.width = innerElementsWidth + 'px';
    const resizerY: HTMLDivElement = this.$refs.resizerY;
    resizerY.style.width = innerElementsWidth + 'px';
    const element3: HTMLDivElement = this.$refs.element3;
    element3.style.width = innerElementsWidth + 'px';
  }
  changeWidth(x: number): void {
    const element1: HTMLDivElement = this.$refs.element1;
    const width: number = element1.clientWidth - 2 * this.padding;
    const xdev: number = x - this.previousX;
    element1.style.width = width + xdev + 'px';
    this.previousX = x;
    this.setElementsWidth(width + xdev);
  }
  // 縦方向のリサイズ
　// 各Elementの高さ調整
  setElementsHeight(el2Height: number): void {
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const rightElementsHeight: number = rightElements.clientHeight; // rightElements は padding なし
    const el3Height: number =
      rightElementsHeight
      - (el2Height + 2 * (this.padding + this.border +  this.margin)) // element2
      - (10 + 2 * (this.padding + this.margin)) // resizerY
      - 2 * (this.padding + this.border +  this.margin);
    const element3: HTMLDivElement = this.$refs.element3;
    element3.style.height = el3Height + 'px';
  }
  changeHeight(y: number): void {
    const element2: HTMLDivElement = this.$refs.element2;
    const height: number = element2.clientHeight - 2 * this.padding;
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
    const element1: HTMLDivElement = this.$refs.element1;
    const width: number = element1.clientWidth - 2 * this.padding;
    this.setElementsWidth(width);
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
  width: 99%;
  height: 400px;
  /* overflow: auto; */
}
/* */
#element1 {
  width: 30%;
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
  height: 400px;
  float: left;
}
#element2 {
  height: 168px;
}
#resizerY {
  height: 10px;
  margin: 10px 5px;
  padding: 0px 5px;
  cursor: n-resize;
}
#element3 {
  height: 168px;
}
</style>

