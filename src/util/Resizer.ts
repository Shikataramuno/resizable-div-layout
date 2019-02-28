export default class Resizer {
  static resizer(resizerID: string, mousemove: (e: MouseEvent) => void, cursor: string): void {
    console.log('resizer(' + resizerID + ')');
    const resizer: HTMLInputElement = document.getElementById(resizerID) as HTMLInputElement;
    resizer.style.cursor = cursor;
    resizer.mousemove = mousemove;
    resizer.onmousedown = (e) => {
      try {
        console.log('resizer.onmousedown(e)');
        document.documentElement.addEventListener('mousemove', resizer.doDrag, false);
        document.documentElement.addEventListener('mouseup', resizer.stopDrag, false);
      } catch (e) {
        console.log('resizer.onmousedown(...) failed! Your browser does not support this feature. ' + e.message);
      }
    };
    resizer.doDrag = (e) => {
      if (e.which !== 1) {
        console.log('mouseup');
        resizer.stopDrag(e);
        return;
      }
      resizer.mousemove(e);
    };
    resizer.stopDrag = (e) => {
      console.log('stopDrag(e)');
      document.documentElement.removeEventListener('mousemove', resizer.doDrag, false);
      document.documentElement.removeEventListener('mouseup', resizer.stopDrag, false);
    };
  }

  static resizerX(resizerID: string, mousemove: (e: MouseEvent) => void): void {
    this.resizer(resizerID, mousemove, 'e-resize');
  }

  static resizerY(resizerID: string, mousemove: (e: MouseEvent) => void): void {
    this.resizer(resizerID, mousemove, 'n-resize');
  }

  static resizerXY(resizerID: string, mousemove: (e: MouseEvent) => void): void {
    this.resizer(resizerID, mousemove, 'ne-resize');
  }
}
