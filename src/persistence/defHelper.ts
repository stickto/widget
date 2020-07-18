import WidgetManager from '../WidgetManager';
import WidgetDef from '../model/widget/def/WidgetDef';
import sampleWidgets from './SampleWidgets';

sampleWidgets.forEach((WidgetClz: any) => WidgetManager.registerWidget(WidgetClz));

export default {
  load(): Array<WidgetDef> {
    return WidgetManager.getAllWidgets();
  },
};
