import Dashboard from '../model/dashboard/Dashboard';
import dashboardHelper from '../persistence/dashboardHelper';
import DashboardAction, { ACTION } from './DashboardAction';
import DashboardState from './DashboardState';
import instanceHelper from '../persistence/instanceHelper';

const dashboardReducer = (state: DashboardState, action: DashboardAction) => {
  switch (action.type) {
    case ACTION.DASHBOARD_CREATE: {
      const { name } = action.payload as PayloadCreate;
      const dashboard = new Dashboard(dashboardHelper.getNextId(), name);
      const dashboards = [...state.dashboards, dashboard];
      // save it
      dashboardHelper.save(dashboards);

      const widgets = instanceHelper.load(dashboard.id);
      return {
        ...state,
        active: dashboard,
        widgets,
      };
    }
    case ACTION.DASHBOARD_RENAME: {
      const { dashboard, name } = action.payload as PayloadRename;
      dashboard.name = name;
      const dashboards = [...state.dashboards];
      dashboardHelper.save(dashboards);
      return { ...state, dashboards };
    }
    case ACTION.DASHBOARD_REMOVE: {
      const { id } = action.payload as PayloadRemove;
      const dashboards = state.dashboards.filter((dashboard: Dashboard) => dashboard.id !== id);
      dashboardHelper.save(dashboards);
      const active = dashboards[0];
      const widgets = instanceHelper.load(active.id);
      return {
        ...state, dashboards, active, widgets,
      };
    }
    case ACTION.DASHBOARD_SWITCH: {
      const { id } = action.payload as PayloadSwitch;
      const active = state.dashboards.find((d: Dashboard) => d.id === id);
      if (!active) {
        return state;
      }
      return { ...state, active };
    }
    default:
      return false;
  }
};

export default dashboardReducer;
