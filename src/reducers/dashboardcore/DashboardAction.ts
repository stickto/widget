import Dashboard from '../../model/dashboard/Dashboard';

export enum ACTION {
  DASHBOARD_INIT = 'dashboard_init', // load data from datasource
  DASHBOARD_CREATE = 'dashboard_create',
  DASHBOARD_REMOVE = 'dashboard_remove',
  DASHBOARD_RENAME = 'dashboard_rename',
  DASHBOARD_SWITCH = 'dashboard_switch', // user switches dashboard
}

export type PayloadInit = {
  id?: number,
};

export type PayloadCreate = {
  name: string,
};

export type PayloadRename = {
  dashboard: Dashboard,
  name: string,
};

export type PayloadRemove = {
  id: number,
};

export type PayloadSwitch = {
  id: number,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadRename | PayloadRemove | PayloadSwitch,
};

export const initDashboard = (id: number) => (dispatch: any, getState: any) => {
  const dashboards = dashboardHelper.load();
  const active = id === undefined ? dashboards[0]
    : dashboards.find((d: Dashboard) => (d.id === id));
  let widgets: Array<Widget> = [];
  if (active) {
    widgets = await instanceHelper.load(active.id);
  }
  return {
    dashboards, active, widgets, inited: true,
  };
}

export default MyAction;
