// DefManager is desiged to manager all Widget Definitions.
// It's supposed to support remove definition as well, but not implemented due to time limitation
import Def from './model/widget/def/Def';

const widgets: Array<Def> = [];

function registerWidget(Clz: any) {
  widgets.push(new Def(Clz));
}

const win: any = window;
win.registerWidget = registerWidget;

class DefManager {
  static getAllWidgets(): Array<Def> {
    return widgets;
  }

  static registerWidget = registerWidget;
}

export default DefManager;
