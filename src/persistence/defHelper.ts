import WidgetDef from '../model/widget/def/WidgetDef';
import sampleWidgets from './SampleWidgets';

export default {
  load(): Array<WidgetDef> {
    return sampleWidgets.map((defObj: any) => new WidgetDef(defObj));
  },
};
