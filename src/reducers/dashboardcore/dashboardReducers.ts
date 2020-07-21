import DashboardAction, {
  ACTION, PayloadInit,
  PayloadRename, PayloadSwitch, PayloadDashboard,
} from './DashboardAction';
import DashboardState from './DashboardState';

const dashboardReducer = (state: DashboardState, action: DashboardAction) => {
  switch (action.type) {
    case ACTION.DASHBOARD_INIT: {
      const { dashboards, active, widgets } = action.payload as PayloadInit;
      return {
        dashboards, active, widgets, inited: true,
      };
    }
    case ACTION.DASHBOARD_UPDATE: {
      const { dashboards, active, widgets } = action.payload as PayloadDashboard;
      return {
        ...state,
        dashboards,
        active,
        widgets,
      };
    }
    case ACTION.DASHBOARD_RENAME: {
      const dashboards = [...(action.payload as PayloadRename).dashboards];
      return { ...state, dashboards };
    }
    case ACTION.DASHBOARD_SWITCH: {
      const { active, widgets } = action.payload as PayloadSwitch;
      return { ...state, active, widgets };
    }
    default:
      return false;
  }
};

export default dashboardReducer;
