import Dashboard from '../model/dashboard/Dashboard';
import WidgetConfig from '../model/widget/instance/WidgetConfig';

type DashboardState = {
  dashboards: Array<Dashboard>, // all dashboards
  active: Dashboard, // active dashboard
  widgets: Array<WidgetConfig>, // widgets of active dashboard
};

export default DashboardState;
