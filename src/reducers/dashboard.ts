/* eslint-disable no-case-declarations */
import DashboardState from './dashboardcore/DashboardState';
import DashboardAction from './dashboardcore/DashboardAction';
import WidgetAction from './dashboardcore/WidgetAction';
import dashboardReducers from './dashboardcore/dashboardReducers';
import widgetReducers from './dashboardcore/widgetReducers';

const initState = {
  dashboards: [],
  active: undefined,
  widgets: [],
  inited: false,
};

const reducer = (state: DashboardState = initState, action: DashboardAction | WidgetAction) => {
  const newState = dashboardReducers(state, action as DashboardAction);
  if (newState !== false) {
    return newState as DashboardState;
  }

  const newState2 = widgetReducers(state, action as WidgetAction);
  if (newState2 !== false) {
    return newState2 as DashboardState;
  }

  return state;
};

export default reducer;
