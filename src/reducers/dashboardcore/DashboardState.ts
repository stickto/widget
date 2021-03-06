import Dashboard from '../../model/dashboard/Dashboard';
import Widget from '../../model/widget/instance/Widget';

type DashboardState = {
  dashboards: Array<Dashboard>, // all dashboards
  active?: Dashboard, // active dashboard
  widgets: Array<Widget>, // widgets of active dashboard
  inited: boolean,
};

export default DashboardState;
