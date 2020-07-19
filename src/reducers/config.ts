/* eslint-disable no-case-declarations */
import Widget from '../model/widget/def/WidgetDef';
import WidgetConfig from '../model/widget/instance/WidgetConfig';
import instanceHelper from '../persistence/instanceHelper';

export enum ACTION {
  CREATE = 'create',
  REMOVE = 'remove',
  FIELD_VALUE_CHANGED = 'fieldValueChanged',
  LAYOUT_CHANGED = 'layoutChanged',
}

type PayloadCreate = {
  widget: Widget,
};

type MyState = {
  configs: Array<WidgetConfig>
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | any,
};

const initState = {
  configs: instanceHelper.load(),
};

const config = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.CREATE:
      const { widget } = action.payload as PayloadCreate;
      const widgetConfig = new WidgetConfig(instanceHelper.getNextId(), widget);
      return {
        configs: [...state.configs, widgetConfig],
      };
    default:
      return state;
  }
};

export default config;
