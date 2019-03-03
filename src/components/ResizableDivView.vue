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
  border: number = 1;
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
  changeWidth(x: number): void {
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const element1: HTMLDivElement = this.$refs.element1;
    const resizerX: HTMLDivElement = this.$refs.resizerX;
    const rightElement: HTMLDivElement = this.$refs.rightElements;
    const element2: HTMLDivElement = this.$refs.element2;
    const resizerY: HTMLDivElement = this.$refs.resizerY;
    const element3: HTMLDivElement = this.$refs.element3;

    const el1Width = x - 25;
    element1.style.width = el1Width + 'px';
    const rightElementWidth =
      resizeArea.offsetWidth -
      el1Width -
      resizerX.offsetWidth -
      2 * 2 * (this.border + this.padding);
    rightElement.style.width = rightElementWidth + 'px';

    const innerElementWidth: number = rightElementWidth - 2 * (this.border + this.padding);
    element2.style.width = innerElementWidth + 'px';
    resizerY.style.width = innerElementWidth + 'px';
    element3.style.width = innerElementWidth + 'px';
  }
  // 縦方向のリサイズ
　// 各Elementの高さ調整
  changeHeight(y: number): void {
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const element2: HTMLDivElement = this.$refs.element2;
    const resizerY: HTMLElement = this.$refs.resizerY;
    const element3: HTMLDivElement = this.$refs.element3;

    const el2height: number = y - 15 - element2.offsetTop;
    element2.style.height = el2height + 'px';
    const el3height: number =
      rightElements.offsetHeight -
      el2height -
      resizerY.offsetHeight -
      2 * 2 * (this.border + this.padding); // el2, el3
    element3.style.height = el3height + 'px';
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
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const element2: HTMLDivElement = this.$refs.element2;
    const resizerY: HTMLElement = this.$refs.resizerY;
    const element3: HTMLDivElement = this.$refs.element3;
    resizerY.style.background = 'green';
    this.previousY = 0;
    console.log('resizeArea.offsetTop : ' + resizeArea.offsetTop);
    console.log('rightElements.offsetTop : ' + rightElements.offsetTop);
    console.log('rightElements.offsetHeight : ' + rightElements.offsetHeight);
    console.log('element2.offsetTop : ' + element2.offsetTop);
    console.log('element2.offsetHeight : ' + element2.offsetHeight);
    console.log('resizerY.offsetTop : ' + resizerY.offsetTop);
    console.log('resizerY.offsetHeight : ' + resizerY.offsetHeight);
    console.log('element3.offsetTop : ' + element3.offsetTop);
    console.log('element3.offsetHeight : ' + element3.offsetHeight);
    console.log('y : ' + e.pageY);
  }
  yResize(e: MouseEvent): void {
    if (e.pageY) {
      this.changeHeight(e.pageY);
    }
  }
}
</script>

<style scoped>
.element {
  border: 1px solid #999999;
  border-radius: 4px;
  margin: 0px;
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
  height: 388px;
  float: left;
}
#resizerX {
  width: 10px;
  height: 388px;
  float: left;
  margin: 0px 0px;
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
  margin: 0px 5px;
  cursor: n-resize;
}
#element3 {
  height: 168px;
}
</style>
