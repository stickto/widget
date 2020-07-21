import Dashboard from '../model/dashboard/Dashboard';

const KEY = '_DASHBOARD_LIST_';

function loadFromLocalStorage(): Array<Dashboard> | undefined {
  const dashboardStr = localStorage.getItem(KEY);
  if (dashboardStr) {
    const dashboardObjs = JSON.parse(dashboardStr);
    return dashboardObjs.map((obj: any) => Dashboard.fromObject(obj));
  }
  return undefined;
}

function writeToLocalStorage(dashboards: Array<Dashboard>) {
  const dashboardObjs = dashboards.map((dashboard: Dashboard) => dashboard.toObject());
  const dashboardStr = JSON.stringify(dashboardObjs);
  localStorage.setItem(KEY, dashboardStr);
}

export default {
  async loadAsync(): Promise<Dashboard[]> {
    return new Promise((resolve: any) => {
      let dashboards = loadFromLocalStorage();
      if (!dashboards) {
        // TODO: here first dashboard is created for quick demo only,
        // should be removed in production code
        dashboards = [
          Dashboard.fromObject({
            id: 1,
            name: 'My First Dashboard',
          }),
        ];
        writeToLocalStorage(dashboards);
      }
      resolve(dashboards);
    });
  },
  async getNextIdAsync(): Promise<number> {
    const loadPromise = this.loadAsync();
    return new Promise((resolve: any) => {
      loadPromise.then((dashboards: Dashboard[]) => {
        const maxId = dashboards.reduce(
          (prev: number, cur: Dashboard) => Math.max(cur.id, prev), -1,
        );
        resolve(maxId + 1);
      });
    });
  },
  async saveAsync(dashboards: Array<Dashboard>): Promise<any> {
    return new Promise((resolve: any) => {
      writeToLocalStorage(dashboards);
      resolve();
    });
  },
};
