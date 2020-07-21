import WidgetAction, {
  ACTION, PayloadWidget,
} from './WidgetAction';
import DashboardState from './DashboardState';

const reducers = (state: DashboardState, action: WidgetAction) => {
  switch (action.type) {
    case ACTION.WIDGET_UPDATE: {
      const { widgets } = action.payload as PayloadWidget;
      return { ...state, widgets };
    }
    default:
      return false;
  }
};

export default reducers;
