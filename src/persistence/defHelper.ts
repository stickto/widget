import WidgetManager from '../WidgetManager';
import Def from '../model/widget/def/Def';
import sampleWidgets from './SampleWidgets';

sampleWidgets.forEach((WidgetClz: any) => WidgetManager.registerWidget(WidgetClz));

export default {
  load(): Array<Def> {
    return WidgetManager.getAllWidgets();
  },
};
