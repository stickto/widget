import Def from '../../model/widget/def/Def';
import Widget from '../../model/widget/instance/Widget';
import WidgetLayout from '../../model/widget/instance/WidgetLayout';

export enum ACTION {
  WIDGET_CREATE = 'config_create',
  WIDGET_REMOVE = 'config_remove',
  WIDGET_FIELD_VALUE_CHANGED = 'config_fieldValueChanged',
  WIDGET_FIELD_VALUE_CHANGED_ALL = 'config_fieldValueChangedAll', // change field values of all widgets, this is for event
  WIDGET_LAYOUT_CHANGED = 'config_layoutChanged',
  DASHBOARD_SWITCH = 'dashboard_switch', // TODO: same as switch in dashboard.ts, to be refactored
}

export type PayloadCreate = {
  def: Def,
};

export type PayloadChangeLayout = {
  widget: Widget,
  layout: WidgetLayout,
};

export type PayloadChangeFieldValues = {
  widget: Widget,
  fieldValues: object,
};

export type PayloadChangeFieldValuesAll = {
  fieldValues: object,
};

export type PayloadRemove = {
  id: number,
};

export type PayloadDashboardSwitch = {
  id: number,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadChangeLayout | PayloadChangeFieldValues
  | PayloadRemove | PayloadDashboardSwitch,
};

export default MyAction;
