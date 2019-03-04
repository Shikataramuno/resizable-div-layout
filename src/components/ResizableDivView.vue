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
        style="background: blue;"
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
  margin: number = 0;
  border: number = 1;
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

    const adjust: number = 3 * (this.border + this.padding) + resizerX.offsetWidth;
    const el1Width: number = x - adjust;
    element1.style.width = el1Width + 'px';
    const resizeAreaWidth =
      + (this.border + this.padding) // element1
      + el1Width
      + (this.border + this.padding) // element1
      + resizerX.offsetWidth // resizerX
      + rightElement.offsetWidth; // rightElement
    resizeArea.style.width = resizeAreaWidth + 'px';
  }
  // 縦方向のリサイズ
　// 各Elementの高さ調整
  changeHeight(y: number): void {
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const element2: HTMLDivElement = this.$refs.element2;
    const resizerY: HTMLElement = this.$refs.resizerY;
    const element3: HTMLDivElement = this.$refs.element3;

    const adjust: number = element2.offsetTop + 2 * (this.border + this.padding) + resizerY.offsetHeight;
    const el2height: number = y - adjust;
    element2.style.height = el2height + 'px';
  }

  // ドラッグ＆ドロップのイベントハンドラー
  xResizeStart(e: MouseEvent): void {
    const resizerX: HTMLElement = this.$refs.resizerX;
    resizerX.style.background = 'gray';
  }
  xResizeEnd(e: MouseEvent): void {
    const resizerX: HTMLElement = this.$refs.resizerX;
    resizerX.style.background = 'red';
  }
  xResize(e: MouseEvent): void {
    if (e.pageX) {
      this.changeWidth(e.pageX);
    }
  }
  yResizeStart(e: MouseEvent): void {
    const resizerY: HTMLElement = this.$refs.resizerY;
    resizerY.style.background = 'gray';
  }
  yResizeEnd(e: MouseEvent) {
    const resizerY: HTMLElement = this.$refs.resizerY;
    resizerY.style.background = 'blue';
  }
  yResize(e: MouseEvent): void {
    if (e.pageY) {
      this.changeHeight(e.pageY);
    }
  }
  mounted(): void {
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const element1: HTMLDivElement = this.$refs.element1;
    const resizerX: HTMLDivElement = this.$refs.resizerX;
    const rightElements: HTMLDivElement = this.$refs.rightElements;
    const width: number =
      (resizeArea.offsetWidth - this.padding) -
      (element1.offsetWidth - 2 * this.margin) -
      resizerX.offsetWidth
      - 2 * (this.border + this.padding);

    rightElements.style.width = width + 'px';
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
  /* overflow-x: auto;*/
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
  /* width: 600px; */
  height: 400px;
  float: left;
  overflow: auto;
}
#element2 {
  height: 183px;
}
#resizerY {
  height: 10px;
  margin: 0px 5px;
  cursor: n-resize;
}
#element3 {
  height: 183px;
}
</style>
