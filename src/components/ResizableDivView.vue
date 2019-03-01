<template>
  <div id="resizeArea"
    ref="resizeArea"
    style="width:1000px; height:250px; overflow:auto; position: relative;"
    class="element">
    <div id="topElements"
      ref="topElement"
      class="element"
      style="overflow:auto; position:absolute; left: 0; top: 0; right:0;">
      <div id="element2"
        ref="element2"
        class="element"
        style="width: 30%; height:10px; float: right; position: relative;">
        Element 2
        <div id="resizerXY"
          ref="resizeXY"
          draggable="true"
          style="width: 10px; height: 10px; background: blue; position:absolute; left: 0; bottom: 0;"
          @drag="resizeXYHandler">
        </div>
      </div>
      <div id="resizerX"
        ref="resizeX"
        draggable="true"
        style="width: 10px; height:100%; background: red; float: right;"
        @drag="resizeXHandler">
      </div>
      <div id="element1"
        ref="element1"
        class="element"
        style="height:10px; overflow:auto;">
        Element 1
      </div>
    </div>
    <div id="resizerY"
      ref="resizerY"
      draggable="true"
      style="height:10px; position:absolute; left: 0; right:0; background: green;"
      @drag="resizeYHandler">
    </div>
    <div id="element3"
      ref="element3"
      class="element"
      style="height:100px; position:absolute; left: 0; bottom: 0; right:0;">
      Element 3
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Resizer from '../util/Resizer';

@Component
export default class ResizableDivView extends Vue {
  name: string = 'ResizableDivView';
   $refs!: {
    'resizeArea': HTMLDivElement;
    'topElement': HTMLDivElement;
    'element1': HTMLDivElement;
    'element2': HTMLDivElement;
    'element3': HTMLDivElement;
    'resizerXY': HTMLDivElement;
    'resizerX': HTMLDivElement;
    'resizerY': HTMLDivElement;
  };

  onresize(): void {
    const topElements: HTMLDivElement = this.$refs.topElement;
    const element1: HTMLDivElement = this.$refs.element1;
    const element2: HTMLDivElement = this.$refs.element2;
    const element3: HTMLDivElement = this.$refs.element3;
    const resizerY: HTMLDivElement = this.$refs.resizerY;
    resizerY.style.top = element3!.offsetTop - 15 + 'px';
    topElements.style.height = resizerY!.offsetTop - 20 + 'px';
    let height: number = topElements!.clientHeight - 32;
    if (height < 0) {
      height = 0;
    }
    element1.style.height = height + 'px';
    element2.style.height = height + 'px';
  }
  resizeX(x: number): void {
    const element2: HTMLDivElement = this.$refs.element2;
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    element2.style.width =
      element2!.parentElement!.clientWidth!
      + resizeArea!.offsetLeft
      - x
      + 'px';
    console.log('element2.style.width = ' + element2.style.width);
  }
  resizeY(y: number): void {
    const element3: HTMLDivElement = this.$refs.element3;
    const resizeArea: HTMLDivElement = this.$refs.resizeArea;
    const height: number =
        element3!.parentElement!.clientHeight!
        + resizeArea!.offsetTop
        - y;
    if ((height + 100) > element3!.parentElement!.clientHeight!) {
      return;
    }
    element3.style.height = height + 'px';
    this.onresize();
  }
  resizeXYHandler(e: MouseEvent): void {
    if (e.pageX) {
      this.resizeX(e.pageX + 10);
    }
    this.resizeY(e.pageY + 50);
  }
  resizeXHandler(e: MouseEvent): void {
    console.log('resizeXHandler e.pageX : ' + e.pageX);
    if (e.pageX) {
      this.resizeX(e.pageX + 25);
    }
  }
  resizeYHandler(e: MouseEvent): void {
    this.resizeY(e.pageY + 25);
  }
  mounted(): void {
    this.onresize();
    // Resizer.resizerXY('resizeXY', this.resizeXYHandler);
    // Resizer.resizerX('resizeX', this.resizeXHandler);
    // Resizer.resizerY('resizeY', this.resizeYHandler);
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
#resizerY {
  cursor: n-resize;
}
#resizerX {
  cursor: e-resize;
}
#resizerXY {
  cursor: ne-resize;
}
</style>

