import Dashboard from '../../model/dashboard/Dashboard';

export enum ACTION {
  DASHBOARD_CREATE = 'dashboard_create',
  DASHBOARD_REMOVE = 'dashboard_remove',
  DASHBOARD_RENAME = 'dashboard_rename',
  DASHBOARD_SWITCH = 'dashboard_switch', // user switches dashboard
}

type PayloadCreate = {
  name: string,
};

type PayloadRename = {
  dashboard: Dashboard,
  name: string,
};

type PayloadRemove = {
  id: number,
};

type PayloadSwitch = {
  id: number,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadRename | PayloadRemove | PayloadSwitch,
};

export default MyAction;
