import Dashboard from '../../model/dashboard/Dashboard';
import Widget from '../../model/widget/instance/WidgetConfig';

type DashboardState = {
  dashboards: Array<Dashboard>, // all dashboards
  active: Dashboard, // active dashboard
  widgets: Array<Widget>, // widgets of active dashboard
};

export default DashboardState;
