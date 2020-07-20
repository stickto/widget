// import React from 'react';
import Def from './model/widget/def/Def';

const widgets: Array<Def> = [];

function registerWidget(Clz: any) {
  widgets.push(new Def(Clz));
}

const win: any = window;
win.registerWidget = registerWidget;

class WidgetManager {
  static getAllWidgets(): Array<Def> {
    return widgets;
  }

  static registerWidget = registerWidget;
}

export default WidgetManager;
