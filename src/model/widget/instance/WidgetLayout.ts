export default class WidgetLayout {
  x: number;

  y: number;

  width: number;

  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static fromObject(obj: any) {
    return new WidgetLayout(obj.x, obj.y, obj.width, obj.height);
  }

  toObject(): object {
    const {
      x, y, width, height,
    } = this;
    return {
      x, y, width, height,
    };
  }
}
