/* eslint-disable no-case-declarations */
import dashboardHelper from '../persistence/dashboardHelper';
import DashboardState from './dashboardcore/DashboardState';
import DashboardAction from './dashboardcore/DashboardAction';
import WidgetAction from './dashboardcore/WidgetAction';
import dashboardReducers from './dashboardcore/dashboardReducers';
import widgetReducers from './dashboardcore/widgetReducers';

const initState = (() => {
  const dashboards = dashboardHelper.load();
  const active = dashboards[0];
  return {
    dashboards,
    active,
    widgets: [],
  };
})();

const reducer = (state: DashboardState = initState, action: DashboardAction | WidgetAction) => {
  const newState = dashboardReducers(state, action as DashboardAction);
  if (newState !== false) {
    return newState as DashboardState;
  }

  const newState2 = widgetReducers(state, action as WidgetAction);
  if (newState !== false) {
    return newState2 as DashboardState;
  }

  return newState;
};

export default reducer;
