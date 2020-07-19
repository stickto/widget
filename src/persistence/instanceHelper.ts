import sampleInstances from './SampleInstances';
import WidgetConfig from '../model/widget/instance/WidgetConfig';

const KEY = '_INSTANCES_';

function parseConfigObjs(configObjs: Array<object>): Array<WidgetConfig> {
  const allInstances: Array<WidgetConfig> = [];
  configObjs.forEach((insObj: any) => {
    const w = WidgetConfig.fromObject(insObj);
    if (w instanceof WidgetConfig) {
      allInstances.push(w);
    }
  });
  return allInstances;
}

function loadSamples(): Array<WidgetConfig> {
  return parseConfigObjs(sampleInstances);
}

function loadFromLocalStorage(): Array<WidgetConfig> | undefined {
  const configStr = localStorage.getItem(KEY);
  if (configStr) {
    const configObjs = JSON.parse(configStr);
    return parseConfigObjs(configObjs);
  }
  return undefined;
}

function writeToLocalStorage(configs: Array<WidgetConfig>) {
  const configObjs = configs.map((config: WidgetConfig) => config.toObject());
  const configStr = JSON.stringify(configObjs);
  localStorage.setItem(KEY, configStr);
}

export default {
  load(): Array<WidgetConfig> {
    let configs = loadFromLocalStorage();
    if (!configs) {
      configs = loadSamples();
      writeToLocalStorage(configs);
    }
    return configs;
  },
  getNextId(): number {
    const maxId = this.load().reduce(
      (prev: number, cur: WidgetConfig) => Math.max(cur.id, prev), -1,
    );
    return maxId + 1;
  },
  save(configs: Array<WidgetConfig>) {
    writeToLocalStorage(configs);
  },
};
