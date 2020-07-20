import Widget from '../../model/widget/instance/Widget';
import instanceHelper from '../../persistence/instanceHelper';
import WidgetAction, {
  ACTION, PayloadCreate, PayloadChangeLayout, PayloadChangeFieldValues, PayloadChangeFieldValuesAll,
  PayloadRemove,
} from './WidgetAction';
import DashboardState from './DashboardState';

const reducers = (state: DashboardState, action: WidgetAction) => {
  switch (action.type) {
    case ACTION.WIDGET_CREATE: {
      const { def } = action.payload as PayloadCreate;
      const widget = new Widget(instanceHelper.getNextId(state.active.id), def);
      const widgets = [...state.widgets, widget];
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
      const newWidget = Widget.fromObject(widget.toObject());
      widgets[idx] = newWidget!;
      instanceHelper.save(state.active.id, widgets);
      return { ...state, widgets };
    }
    case ACTION.WIDGET_REMOVE: {
      const { id } = action.payload as PayloadRemove;
      const widgets = state.widgets.filter((w: Widget) => w.id !== id);
      instanceHelper.save(state.active.id, widgets);
      return { ...state, widgets };
    }
    case ACTION.WIDGET_FIELD_VALUE_CHANGED_ALL: {
      const { fieldValues } = action.payload as PayloadChangeFieldValuesAll;
      const widgets = state.widgets.map((w: Widget) => {
        // eslint-disable-next-line no-param-reassign
        w.fieldValues = { ...w.fieldValues, ...fieldValues };
        const nw = Widget.fromObject(w.toObject());
        return nw;
      });
      instanceHelper.save(state.active.id, widgets as Array<Widget>);
      return { ...state, widgets };
    }
    default:
      return false;
  }
};

export default reducers;
