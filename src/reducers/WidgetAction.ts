import WidgetDef from '../model/widget/def/WidgetDef';
import WidgetConfig from '../model/widget/instance/WidgetConfig';
import WidgetLayout from '../model/widget/instance/WidgetLayout';

export enum ACTION {
  WIDGET_CREATE = 'config_create',
  WIDGET_REMOVE = 'config_remove',
  WIDGET_FIELD_VALUE_CHANGED = 'config_fieldValueChanged',
  WIDGET_FIELD_VALUE_CHANGED_ALL = 'config_fieldValueChangedAll', // change field values of all widgets, this is for event
  WIDGET_LAYOUT_CHANGED = 'config_layoutChanged',
  DASHBOARD_SWITCH = 'dashboard_switch', // TODO: same as switch in dashboard.ts, to be refactored
}

type PayloadCreate = {
  def: WidgetDef,
};

type PayloadChangeLayout = {
  widget: WidgetConfig,
  layout: WidgetLayout,
};

type PayloadChangeFieldValues = {
  widget: WidgetConfig,
  fieldValues: object,
};

type PayloadChangeFieldValuesAll = {
  fieldValues: object,
};

type PayloadRemove = {
  id: number,
};

type PayloadDashboardSwitch = {
  id: number,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadChangeLayout | PayloadChangeFieldValues
  | PayloadRemove | PayloadDashboardSwitch,
};

export default MyAction;
