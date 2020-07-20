/* eslint-disable no-case-declarations */
import dashboardHelper from '../persistence/dashboardHelper';
import DashboardState from './dashboardcore/DashboardState';
import DashboardAction from './dashboardcore/DashboardAction';
import WidgetAction from './dashboardcore/WidgetAction';
import dashboardReducers from './dashboardcore/dashboardReducers';
import widgetReducers from './dashboardcore/widgetReducers';
import instanceHelper from '../persistence/instanceHelper';
import Dashboard from '../model/dashboard/Dashboard';

const initState = (() => {
  const dashboards = dashboardHelper.load();
  let idx = 0;
  // eslint-disable-next-line no-restricted-globals
  const { href } = location;
  if (href.indexOf('/share') >= 0) { // quick check for demo only
    const m = /id=(\d)/.exec(href);
    if (m) {
      const id = parseInt(m[1], 10);
      idx = dashboards.findIndex((d:Dashboard) => d.id === id);
      if (idx < 0) {
        // eslint-disable-next-line no-alert
        alert(`No dashboard found for id ${id}`);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Dashboard id is missing in url');
    }
  }
  const active = dashboards[idx];
  const widgets = instanceHelper.load(active.id);
  return {
    dashboards,
    active,
    widgets,
  };
})();

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
