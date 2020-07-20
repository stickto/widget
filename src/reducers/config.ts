/* eslint-disable no-case-declarations */
import dashboardHelper from '../persistence/dashboardHelper';
import Widget from '../model/widget/def/WidgetDef';
import WidgetConfig from '../model/widget/instance/WidgetConfig';
import instanceHelper from '../persistence/instanceHelper';
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
  widget: Widget,
};

type PayloadChangeLayout = {
  config: WidgetConfig,
  layout: WidgetLayout,
};

type PayloadChangeFieldValues = {
  config: WidgetConfig,
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

type MyState = {
  configs: Array<WidgetConfig>,
  dashboardId: number,
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadChangeLayout | PayloadChangeFieldValues
  | PayloadRemove | PayloadDashboardSwitch,
};

const initState = (() => {
  const dashboards = dashboardHelper.load();
  const dashboardId = dashboards[0].id;
  const configs = instanceHelper.load(dashboardId);
  return { configs, dashboardId };
})();

const configReducer = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.WIDGET_CREATE: {
      const { widget } = action.payload as PayloadCreate;
      const widgetConfig = new WidgetConfig(instanceHelper.getNextId(state.dashboardId), widget);
      const newConfigs = [...state.configs, widgetConfig];
      // save it
      instanceHelper.save(state.dashboardId, newConfigs);
      return {
        configs: newConfigs,
        dashboardId: state.dashboardId,
      };
    }
    case ACTION.WIDGET_LAYOUT_CHANGED: {
      const { config, layout } = action.payload as PayloadChangeLayout;
      config.layout = layout;
      const newConfigs = [...state.configs];
      instanceHelper.save(state.dashboardId, newConfigs);
      return {
        configs: newConfigs,
        dashboardId: state.dashboardId,
      };
    }
    case ACTION.WIDGET_FIELD_VALUE_CHANGED: {
      const { config, fieldValues } = action.payload as PayloadChangeFieldValues;
      config.fieldValues = fieldValues;
      const newConfigs = [...state.configs];
      const cfgIdx = newConfigs.indexOf(config);
      // reconstruct the config so that ui can be updated
      const newCfg = WidgetConfig.fromObject(config.toObject());
      newConfigs[cfgIdx] = newCfg!;
      instanceHelper.save(state.dashboardId, newConfigs);
      return {
        configs: newConfigs,
        dashboardId: state.dashboardId,
      };
    }
    case ACTION.WIDGET_REMOVE: {
      const { id } = action.payload as PayloadRemove;
      const newConfigs = state.configs.filter((config: WidgetConfig) => config.id !== id);
      instanceHelper.save(state.dashboardId, newConfigs);
      return {
        configs: newConfigs,
        dashboardId: state.dashboardId,
      };
    }
    case ACTION.WIDGET_FIELD_VALUE_CHANGED_ALL: {
      const { fieldValues } = action.payload as PayloadChangeFieldValuesAll;
      const newConfigs = state.configs.map((config: WidgetConfig) => {
        // eslint-disable-next-line no-param-reassign
        config.fieldValues = { ...config.fieldValues, ...fieldValues };
        const newCfg = WidgetConfig.fromObject(config.toObject());
        return newCfg;
      });
      instanceHelper.save(state.dashboardId, newConfigs as Array<WidgetConfig>);
      return {
        configs: newConfigs,
        dashboardId: state.dashboardId,
      };
    }
    case ACTION.DASHBOARD_SWITCH: {
      const { id } = action.payload as PayloadDashboardSwitch;
      const dashboardId = id;
      const configs = instanceHelper.load(dashboardId);
      return {
        configs,
        dashboardId,
      };
    }
    default:
      return state;
  }
};

export default configReducer;
