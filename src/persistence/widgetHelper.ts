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
  async loadAsync(dashboardId: number): Promise<Array<Widget>> {
    return new Promise((resolve: any) => {
      let widgets = loadFromLocalStorage(dashboardId);
      if (!widgets) {
        widgets = [];
        writeToLocalStorage(dashboardId, widgets);
      }
      resolve(widgets);
    });
  },
  async getNextIdAsync(dashboardId:number): Promise<number> {
    const loadPromise = this.loadAsync(dashboardId);
    return new Promise((resolve: any) => {
      loadPromise.then((widgets: Widget[]) => {
        const maxId = widgets.reduce(
          (prev: number, cur: Widget) => Math.max(cur.id, prev), -1,
        );
        resolve(maxId + 1);
      });
    });
  },
  async saveAsync(dashboardId: number, widgets: Array<Widget>): Promise<any> {
    return new Promise((resolve: any) => {
      writeToLocalStorage(dashboardId, widgets);
      resolve();
    });
  },
  async removeDashboardAsync(id:number): Promise<any> {
    return new Promise((resolve: any) => {
      const key = KEY.replace('%', `${id}`);
      localStorage.removeItem(key);
      resolve();
    });
  },
};
