import Dashboard from '../model/dashboard/Dashboard';

const KEY = '_DASHBOARD_';

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
  load(): Array<Dashboard> {
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
    return dashboards;
  },
  async loadAsync(): Promise<Dashboard[]> {
    return new Promise((resolve: any) => {
      resolve(this.load());
    });
  },
  getNextId(): number {
    const maxId = this.load().reduce(
      (prev: number, cur: Dashboard) => Math.max(cur.id, prev), -1,
    );
    return maxId + 1;
  },
  async getNextIdAsync(): Promise<number> {
    return new Promise((resolve: any) => {
      resolve(this.getNextId());
    });
  },
  save(dashboards: Array<Dashboard>) {
    writeToLocalStorage(dashboards);
  },
  async saveAsync(dashboards: Array<Dashboard>): Promise<any> {
    return new Promise((resolve: any) => {
      this.save(dashboards);
      resolve();
    });
  },
};
