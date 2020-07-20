/* eslint-disable no-case-declarations */
import dashboardHelper from '../persistence/dashboardHelper';
import DashboardState from './dashboard/DashboardState';
import DashboardAction from './dashboard/DashboardAction';
import dashboardReducers from './dashboard/dashboardReducers';
import widgetReducers from './widgetReducers';

const initState = (() => {
  const dashboards = dashboardHelper.load();
  const active = dashboards[0];
  return {
    dashboards,
    active,
  };
})();

const reducer = (state: DashboardState = initState, action: DashboardAction) => {
  let newState = dashboardReducers(state, action);
  if (newState === false) {
    newState = widgetReducers(state, action);
  } else {
    newState = state;
  }
  return newState;
};

export default reducer;
