import Def from '../../model/widget/def/Def';
import Widget from '../../model/widget/instance/Widget';
import WidgetLayout from '../../model/widget/instance/WidgetLayout';
import instanceHelper from '../../persistence/instanceHelper';

export enum ACTION {
  WIDGET_UPDATE = 'config_update',
}

export type PayloadWidget = {
  widgets: Widget[],
};

type MyAction = {
  type: ACTION,
  payload: PayloadWidget,
};

export const createWidget = (def: Def) => async (dispatch: any, getState: any) => {
  const { id: dashboardId } = getState().dashboard.active!;
  const widget = new Widget(await instanceHelper.getNextIdAsync(dashboardId), def);
  const widgets = [...getState().dashboard.widgets, widget];
  // save it
  await instanceHelper.saveAsync(dashboardId, widgets);

  dispatch({
    type: ACTION.WIDGET_UPDATE,
    payload: {
      widgets,
    },
  });
};

export const changeWidgetLayout = (
  widget: Widget, layout:WidgetLayout,
) => async (dispatch: any, getState: any) => {
  const { id: dashboardId } = getState().dashboard.active!;
  // eslint-disable-next-line no-param-reassign
  widget.layout = layout;
  const widgets = [...getState().dashboard.widgets];
  // save it
  await instanceHelper.saveAsync(dashboardId, widgets);

  dispatch({
    type: ACTION.WIDGET_UPDATE,
    payload: {
      widgets,
    },
  });
};

export const changeWidgetFieldValue = (
  widget: Widget, fieldValues: object,
) => async (dispatch: any, getState: any) => {
  const { id: dashboardId } = getState().dashboard.active!;

  // eslint-disable-next-line no-param-reassign
  widget.fieldValues = fieldValues;
  const widgets = [...getState().dashboard.widgets];
  const idx = widgets.indexOf(widget);
  widgets[idx] = widget.clone();

  // save it
  await instanceHelper.saveAsync(dashboardId, widgets);

  dispatch({
    type: ACTION.WIDGET_UPDATE,
    payload: {
      widgets,
    },
  });
};

export const changeWidgetFieldValueAll = (
  fieldValues: object,
) => async (dispatch: any, getState: any) => {
  const { id: dashboardId } = getState().dashboard.active!;

  const widgets = getState().dashboard.widgets.map((w: Widget) => {
    // eslint-disable-next-line no-param-reassign
    w.fieldValues = { ...w.fieldValues, ...fieldValues };
    return w.clone();
  });

  // save it
  await instanceHelper.saveAsync(dashboardId, widgets);

  dispatch({
    type: ACTION.WIDGET_UPDATE,
    payload: {
      widgets,
    },
  });
};

export const removeWidget = (
  id: number,
) => async (dispatch: any, getState: any) => {
  const { id: dashboardId } = getState().dashboard.active!;

  const widgets = getState().dashboard.widgets.filter((w: Widget) => w.id !== id);

  // save it
  await instanceHelper.saveAsync(dashboardId, widgets);

  dispatch({
    type: ACTION.WIDGET_UPDATE,
    payload: {
      widgets,
    },
  });
};

export default MyAction;
