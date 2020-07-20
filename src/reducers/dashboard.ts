/* eslint-disable no-case-declarations */
import Dashboard from '../model/dashboard/Dashboard';
import dashboardHelper from '../persistence/dashboardHelper';

export enum ACTION {
  CREATE = 'create',
  REMOVE = 'remove',
  RENAME = 'rename',
  SWITCH = 'switch', // user switches dashboard
}

type PayloadCreate = {
  name: string,
};

type PayloadRename = {
  dashboard: Dashboard
};

type PayloadRemove = {
  id: number,
};

type PayloadSwitch = {
  id: number,
};

type MyState = {
  dashboards: Array<Dashboard>,
  active: Dashboard,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadRename | PayloadRemove | PayloadSwitch,
};

const initState = (() => {
  const dashboards = dashboardHelper.load();
  const active = dashboards[0];
  return {
    dashboards,
    active,
  };
})();

const dashboardReducer = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.CREATE: {
      const { name } = action.payload as PayloadCreate;
      const dashboard = new Dashboard(dashboardHelper.getNextId(), name);
      const dashboards = [...state.dashboards, dashboard];
      // save it
      dashboardHelper.save(dashboards);
      return {
        dashboards,
        active: dashboard,
      };
    }
    case ACTION.RENAME: {
      const { dashboard } = action.payload as PayloadRename;
      const dashboards = [...state.dashboards];
      dashboardHelper.save(dashboards);
      return {
        dashboards,
        active: state.active,
      };
    }
    case ACTION.REMOVE: {
      const { id } = action.payload as PayloadRemove;
      const dashboards = state.dashboards.filter((dashboard: Dashboard) => dashboard.id !== id);
      dashboardHelper.save(dashboards);
      return {
        dashboards,
        active: state.active,
      };
    }
    case ACTION.SWITCH: {
      const { id } = action.payload as PayloadSwitch;
      const dashboard = state.dashboards.find((d: Dashboard) => d.id === id);
      if (!dashboard) {
        return state;
      }
      return {
        dashboards: state.dashboards,
        active: dashboard,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
