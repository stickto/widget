import DefManager from '../RefManager';
import Def from '../model/widget/def/Def';
import sampleWidgets from './SampleWidgets';

sampleWidgets.forEach((WidgetClz: any) => DefManager.registerWidget(WidgetClz));

export default {
  load(): Array<Def> {
    return DefManager.getAllWidgets();
  },
};
