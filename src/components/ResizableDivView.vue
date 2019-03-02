<template>
  <div id="resizeArea"
    ref="resizeArea"
    style="height: 400px;"
    class="element">
    <div id="topElements"
      ref="topElements"
      style="height: 120px;"
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
      <div id="element2"
        ref="element2"
        class="element">
        リサイズエリア２
      </div>
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
    'topElements': HTMLDivElement;
    'element1': HTMLDivElement;
    'element2': HTMLDivElement;
    'element3': HTMLDivElement;
    'resizerXY': HTMLDivElement;
    'resizerX': HTMLDivElement;
    'resizerY': HTMLDivElement;
  };

　// 各Elementの高さ調整
  setElementsHeight(): void {
    // topElements内の<div>をpaddingを考慮してtopElementsの高さに合わせる
    const padding: number = 25; // 上下5px
    const topElements: HTMLDivElement = this.$refs.topElements;
    let styleHeight: string = topElements!.style!.height!;
    const topElementsHeight: number = Number(styleHeight.substring(0, styleHeight.indexOf('px')));
    const innerElementsHeight: string = topElementsHeight - padding + 'px';
    console.log('topElementsHeight : ' + styleHeight);
    console.log('innerElementsHeight : ' +  innerElementsHeight);

    const element1: HTMLDivElement = this.$refs.element1;
    element1.style.height = innerElementsHeight;
    const element2: HTMLDivElement = this.$refs.element2;
    element2.style.height = innerElementsHeight;
    const resizerX: HTMLDivElement = this.$refs.resizerX;
    resizerX.style.height = innerElementsHeight;

    // リサイズエリア３の高さを変更
    const resizeArea: HTMLElement = this.$refs.resizeArea;
    styleHeight = resizeArea!.style!.height!;
    const resizeAreaHeight: number = Number(styleHeight.substring(0, styleHeight.indexOf('px')));
    const resizerY: HTMLDivElement = this.$refs.resizerY;

    const el3Height: string = resizeAreaHeight - topElementsHeight - padding - 30 + 'px';
    const element3: HTMLElement = this.$refs.element3;
    element3.style.height = el3Height;
  }
  // 横方向のリサイズ
  changeWidth(x: number): void {
    const element1: HTMLDivElement = this.$refs.element1;
    const styleWidth: string = element1!.style!.width!;
    const width: number = Number(styleWidth.substring(0, styleWidth.indexOf('px')));
    const xdev: number = x - this.previousX;
    element1.style.width = width + xdev + 'px';
    this.previousX = x;
  }
  // 縦方向のリサイズ
  changeHeight(y: number): void {
    const topElements: HTMLDivElement = this.$refs.topElements;
    const styleHeight: string = topElements!.style!.height!;
    const height: number = Number(styleHeight.substring(0, styleHeight.indexOf('px')));
    const ydev: number = y - this.previousY;
    topElements.style.height = height + ydev + 'px';
    this.previousY = y;
    this.setElementsHeight();
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
    this.setElementsHeight();
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
  width: 1000px;
  /* height: 400px; */
  /* overflow: auto; */
}
/* */
#topElements {
  overflow: auto;
}
#element1 {
  float: left;
}
#resizerX {
  width: 10px;
  float: left;
  margin: 5px 0px;
  padding: 5px 0px;
  cursor: e-resize;
}
#element2 {
  float: left;
}
/* */
#resizerY {
  height: 10px;
  margin: 0px 5px;
  padding: 0px 5px;
  cursor: n-resize;
}
/* */
#element3 {
  height: 200px;
}
</style>

