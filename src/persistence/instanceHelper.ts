import sampleInstances from './SampleInstances';
import WidgetConfig from '../model/widget/instance/WidgetConfig';

const allInstances: Array<WidgetConfig> = [];
sampleInstances.forEach((insObj: any) => {
  const w = WidgetConfig.fromObject(insObj);
  if (w instanceof WidgetConfig) {
    allInstances.push(w);
  }
});

export default {
  load(): Array<WidgetConfig> {
    return allInstances;
  },
};
