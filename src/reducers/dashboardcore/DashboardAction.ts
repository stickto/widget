import Dashboard from '../../model/dashboard/Dashboard';
import dashboardHelper from '../../persistence/dashboardHelper';
import Widget from '../../model/widget/instance/Widget';
import instanceHelper from '../../persistence/instanceHelper';

export enum ACTION {
  DASHBOARD_INIT = 'dashboard_init', // load data from datasource
  DASHBOARD_UPDATE = 'dashboard_update', // update: create, remove
  DASHBOARD_RENAME = 'dashboard_rename',
  DASHBOARD_SWITCH = 'dashboard_switch', // user switches dashboard
}

export type PayloadDashboard = {
  dashboards: Dashboard[],
  active?: Dashboard,
  widgets: Widget[],
};

export type PayloadInit = {
  dashboards: Dashboard[],
  active?: Dashboard,
  widgets: Widget[],
};

export type PayloadRename = {
  dashboards: Dashboard[],
};

export type PayloadSwitch = {
  active: Dashboard,
  widgets: Widget[],
};

type MyAction = {
  type: ACTION,
  payload: PayloadRename | PayloadSwitch | PayloadInit | PayloadDashboard,
};

export const initDashboard = (id?: number) => async (dispatch: any, getState: any) => {
  const dashboards = await dashboardHelper.loadAsync();
  const active = id === undefined ? dashboards[0]
    : dashboards.find((d: Dashboard) => (d.id === id));
  let widgets: Array<Widget> = [];
  if (active) {
    widgets = await instanceHelper.loadAsync(active.id);
  }
  dispatch({
    type: ACTION.DASHBOARD_INIT,
    payload: { dashboards, active, widgets },
  });
};

export const createDashboard = (name: string) => async (dispatch: any, getState: any) => {
  const dashboard = new Dashboard(await dashboardHelper.getNextIdAsync(), name);
  const dashboards = [...getState().dashboard.dashboards, dashboard];
  // save it
  await dashboardHelper.saveAsync(dashboards);

  const widgets = await instanceHelper.loadAsync(dashboard.id);

  dispatch({
    type: ACTION.DASHBOARD_UPDATE,
    payload: {
      dashboards,
      active: dashboard,
      widgets,
    },
  });
};

export const renameDashboard = (
  dashboard: Dashboard, name: string,
) => async (dispatch: any, getState: any) => {
  // eslint-disable-next-line no-param-reassign
  dashboard.name = name;
  const { dashboards } = getState().dashboard;
  await dashboardHelper.saveAsync(dashboards);

  dispatch({
    type: ACTION.DASHBOARD_RENAME,
    payload: {
      dashboards,
    },
  });
};

export const removeDashboard = (id: number) => async (dispatch: any, getState: any) => {
  const dashboards = getState().dashboard.dashboards.filter((d: Dashboard) => d.id !== id);
  await dashboardHelper.saveAsync(dashboards);
  await instanceHelper.removeDashboardAsync(id);
  const active = dashboards[0];
  const widgets = await instanceHelper.loadAsync(active.id);

  dispatch({
    type: ACTION.DASHBOARD_UPDATE,
    payload: {
      dashboards,
      active,
      widgets,
    },
  });
};

export const switchDashboard = (id: number) => async (dispatch: any, getState: any) => {
  const active = getState().dashboard.dashboards.find((d: Dashboard) => d.id === id);
  if (!active) {
    return;
  }
  const widgets = await instanceHelper.loadAsync(active.id);

  dispatch({
    type: ACTION.DASHBOARD_SWITCH,
    payload: {
      active,
      widgets,
    },
  });
};

export default MyAction;
