// import sampleInstances from './SampleInstances';
import Widget from '../model/widget/instance/Widget';

const KEY = '_DASHBOARD_%_';

function parseConfigObjs(configObjs: Array<object>): Array<Widget> {
  const allInstances: Array<Widget> = [];
  configObjs.forEach((insObj: any) => {
    const w = Widget.fromObject(insObj);
    if (w instanceof Widget) {
      allInstances.push(w);
    }
  });
  return allInstances;
}

function loadFromLocalStorage(dashboardId: number): Array<Widget> | undefined {
  const key = KEY.replace('%', `${dashboardId}`);
  const configStr = localStorage.getItem(key);
  if (configStr) {
    const configObjs = JSON.parse(configStr);
    return parseConfigObjs(configObjs);
  }
  return undefined;
}

function writeToLocalStorage(dashboardId: number, configs: Array<Widget>) {
  const key = KEY.replace('%', `${dashboardId}`);
  const configObjs = configs.map((config: Widget) => config.toObject());
  const configStr = JSON.stringify(configObjs);
  localStorage.setItem(key, configStr);
}

export default {
  load(dashboardId: number): Array<Widget> {
    let configs = loadFromLocalStorage(dashboardId);
    if (!configs) {
      configs = [];
      writeToLocalStorage(dashboardId, configs);
    }
    return configs;
  },
  getNextId(dashboardId:number): number {
    const maxId = this.load(dashboardId).reduce(
      (prev: number, cur: Widget) => Math.max(cur.id, prev), -1,
    );
    return maxId + 1;
  },
  save(dashboardId: number, configs: Array<Widget>) {
    writeToLocalStorage(dashboardId, configs);
  },
};
