import WidgetConfig from '../model/widget/instance/WidgetConfig';
import instanceHelper from '../persistence/instanceHelper';
import WidgetAction, { ACTION } from './WidgetAction';
import DashboardState from './DashboardState';

const reducers = (state: DashboardState, action: WidgetAction) => {
  switch (action.type) {
    case ACTION.WIDGET_CREATE: {
      const { def } = action.payload as PayloadCreate;
      const widget = new WidgetConfig(instanceHelper.getNextId(state.active.id), def);
      const widgets = [...state.configs, widget];
      // save it
      instanceHelper.save(state.active.id, widgets);

      return { ...state, widgets };
    }
    case ACTION.WIDGET_LAYOUT_CHANGED: {
      const { widget, layout } = action.payload as PayloadChangeLayout;
      widget.layout = layout;
      const widgets = [...state.widgets];
      instanceHelper.save(state.active.id, widgets);
      return { ...state, widgets };
    }
    case ACTION.WIDGET_FIELD_VALUE_CHANGED: {
      const { widget, fieldValues } = action.payload as PayloadChangeFieldValues;
      widget.fieldValues = fieldValues;
      const widgets = [...state.widgets];
      const idx = widgets.indexOf(widget);
      // reconstruct the config so that ui can be updated
      const newWidget = WidgetConfig.fromObject(widget.toObject());
      widgets[idx] = newWidget!;
      instanceHelper.save(state.dashboardId, widgets);
      return { ...state, widgets };
    }
    case ACTION.WIDGET_REMOVE: {
      const { id } = action.payload as PayloadRemove;
      const widgets = state.widgets.filter((w: WidgetConfig) => w.id !== id);
      instanceHelper.save(state.active.id, widgets);
      return { ...state, widgets };
    }
    case ACTION.WIDGET_FIELD_VALUE_CHANGED_ALL: {
      const { fieldValues } = action.payload as PayloadChangeFieldValuesAll;
      const widgets = state.widgets.map((w: WidgetConfig) => {
        // eslint-disable-next-line no-param-reassign
        w.fieldValues = { ...w.fieldValues, ...fieldValues };
        const nw = WidgetConfig.fromObject(w.toObject());
        return nw;
      });
      instanceHelper.save(state.active.id, widgets as Array<WidgetConfig>);
      return { ...state, widgets };
    }
    // case ACTION.DASHBOARD_SWITCH: {
    //   const { id } = action.payload as PayloadDashboardSwitch;
    //   const configs = instanceHelper.load(dashboardId);
    //   return {
    //     configs,
    //     dashboardId,
    //   };
    // }
    default:
      return false;
  }
};

export default reducers;
