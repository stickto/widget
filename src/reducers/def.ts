/* eslint-disable no-case-declarations */
import Widget from '../model/widget/def/WidgetDef';
import defHelper from '../persistence/defHelper';

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
  widgets: Array<Widget>
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | any,
};

const initState = {
  widgets: defHelper.load(),
};

const defReducer = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.CREATE:
      const { widget } = action.payload as PayloadCreate;
      const newDefs = [...state.widgets, widget];
      // no need to save
      return {
        widgets: newDefs,
      };
    default:
      return state;
  }
};

export default defReducer;
