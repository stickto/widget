import Dashboard from '../../model/dashboard/Dashboard';

export enum ACTION {
  DASHBOARD_CREATE = 'dashboard_create',
  DASHBOARD_REMOVE = 'dashboard_remove',
  DASHBOARD_RENAME = 'dashboard_rename',
  DASHBOARD_SWITCH = 'dashboard_switch', // user switches dashboard
}

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

export default MyAction;
