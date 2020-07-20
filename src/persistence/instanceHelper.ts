// import sampleInstances from './SampleInstances';
import WidgetConfig from '../model/widget/instance/WidgetConfig';

const KEY = '_DASHBOARD_%_';

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

// function loadSamples(): Array<WidgetConfig> {
//   return parseConfigObjs(sampleInstances);
// }

function loadFromLocalStorage(dashboardId: number): Array<WidgetConfig> | undefined {
  const key = KEY.replace('%', `${dashboardId}`);
  const configStr = localStorage.getItem(key);
  if (configStr) {
    const configObjs = JSON.parse(configStr);
    return parseConfigObjs(configObjs);
  }
  return undefined;
}

function writeToLocalStorage(dashboardId: number, configs: Array<WidgetConfig>) {
  const key = KEY.replace('%', `${dashboardId}`);
  const configObjs = configs.map((config: WidgetConfig) => config.toObject());
  const configStr = JSON.stringify(configObjs);
  localStorage.setItem(key, configStr);
}

export default {
  load(dashboardId: number): Array<WidgetConfig> {
    let configs = loadFromLocalStorage(dashboardId);
    if (!configs) {
      configs = [];
      writeToLocalStorage(dashboardId, configs);
    }
    return configs;
  },
  getNextId(dashboardId:number): number {
    const maxId = this.load(dashboardId).reduce(
      (prev: number, cur: WidgetConfig) => Math.max(cur.id, prev), -1,
    );
    return maxId + 1;
  },
  save(dashboardId: number, configs: Array<WidgetConfig>) {
    writeToLocalStorage(dashboardId, configs);
  },
};
