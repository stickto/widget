// import sampleInstances from './SampleInstances';
import Widget from '../model/widget/instance/Widget';
import Def from '../model/widget/def/Def';
import defHelper from './defHelper';

const KEY = '_DASHBOARD_%_';

function parseConfigObjs(configObjs: Array<object>): Array<Widget> {
  const allDefs = defHelper.load();
  const allInstances: Array<Widget> = [];
  configObjs.forEach((insObj: any) => {
    const def = allDefs.find((d: Def) => d.id === insObj.def);
    const w = Widget.fromObject(insObj, def!);
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

function writeToLocalStorage(dashboardId: number, widgets: Array<Widget>) {
  const key = KEY.replace('%', `${dashboardId}`);
  const configObjs = widgets.map((widget: Widget) => widget.toObject());
  const configStr = JSON.stringify(configObjs);
  localStorage.setItem(key, configStr);
}

export default {
  load(dashboardId: number): Array<Widget> {
    let widgets = loadFromLocalStorage(dashboardId);
    if (!widgets) {
      widgets = [];
      writeToLocalStorage(dashboardId, widgets);
    }
    return widgets;
  },
  async loadAsync(dashboardId: number): Promise<Array<Widget>> {
    return new Promise((resolve: any) => {
      resolve(this.load(dashboardId));
    });
  },
  getNextId(dashboardId:number): number {
    const maxId = this.load(dashboardId).reduce(
      (prev: number, cur: Widget) => Math.max(cur.id, prev), -1,
    );
    return maxId + 1;
  },
  async getNextIdAsync(dashboardId:number): Promise<number> {
    return new Promise((resolve: any) => {
      resolve(this.getNextId(dashboardId));
    });
  },
  save(dashboardId: number, widgets: Array<Widget>) {
    writeToLocalStorage(dashboardId, widgets);
  },
  async saveAsync(dashboardId: number, widgets: Array<Widget>): Promise<any> {
    return new Promise((resolve: any) => {
      this.save(dashboardId, widgets);
      resolve();
    });
  },
};
