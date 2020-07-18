import WidgetDef from './model/widget/def/WidgetDef';

const widgets: Array<WidgetDef> = [];

function registerWidget(Clz: any) {
  widgets.push(new WidgetDef(Clz));
}

const win: any = window;
win.registerWidget = registerWidget;

class WidgetManager {
  static getAllWidgets(): Array<WidgetDef> {
    return widgets;
  }

  static registerWidget = registerWidget;
}

export default WidgetManager;
