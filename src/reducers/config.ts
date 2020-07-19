/* eslint-disable no-case-declarations */
import Widget from '../model/widget/def/WidgetDef';
import WidgetConfig from '../model/widget/instance/WidgetConfig';
import instanceHelper from '../persistence/instanceHelper';
import WidgetLayout from '../model/widget/instance/WidgetLayout';

export enum ACTION {
  CREATE = 'create',
  REMOVE = 'remove',
  FIELD_VALUE_CHANGED = 'fieldValueChanged',
  LAYOUT_CHANGED = 'layoutChanged',
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

type MyState = {
  configs: Array<WidgetConfig>
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | PayloadChangeLayout | PayloadChangeFieldValues,
};

const initState = {
  configs: instanceHelper.load(),
};

const configReducer = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.CREATE: {
      const { widget } = action.payload as PayloadCreate;
      const widgetConfig = new WidgetConfig(instanceHelper.getNextId(), widget);
      const newConfigs = [...state.configs, widgetConfig];
      // save it
      instanceHelper.save(newConfigs);
      return {
        configs: newConfigs,
      };
    }
    case ACTION.LAYOUT_CHANGED: {
      const { config, layout } = action.payload as PayloadChangeLayout;
      config.layout = layout;
      const newConfigs = [...state.configs];
      instanceHelper.save(newConfigs);
      return {
        configs: newConfigs,
      };
    }
    case ACTION.FIELD_VALUE_CHANGED: {
      const { config, fieldValues } = action.payload as PayloadChangeFieldValues;
      config.fieldValues = fieldValues;
      const newConfigs = [...state.configs];
      instanceHelper.save(newConfigs);
      return {
        configs: newConfigs,
      };
    }
    default:
      return state;
  }
};

export default configReducer;
