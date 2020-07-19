import WidgetDef from '../def/WidgetDef';
import WidgetLayout from './WidgetLayout';
import WidgetManager from '../../../WidgetManager';
import Field from '../../field/Field';

export default class WidgetConfig {
  id: number;

  widget: WidgetDef;

  fieldValues: object;

  layout: WidgetLayout;

  constructor(
    id: number,
    widget: WidgetDef,
    fieldValues: object | undefined = undefined,
    layout: WidgetLayout = new WidgetLayout(0, 0, 200, 60),
  ) {
    this.id = id;
    this.widget = widget;
    if (!fieldValues) {
      const fieldValues2 = {};
      widget.fields!.forEach((field: Field) => {
        fieldValues2[field.name] = field.defaultValue;
      });
      this.fieldValues = fieldValues2;
    } else {
      this.fieldValues = fieldValues;
    }
    this.layout = layout;
  }

  static fromObject(insObj: any): WidgetConfig | null {
    const widgetId = insObj.widget;
    const allWidgets = WidgetManager.getAllWidgets();
    const widget = allWidgets.find((w: WidgetDef) => w.id === widgetId);
    if (!widget) {
      console.error(`Can't find widget ${widgetId}`);
      return null;
    }
    const fieldValues = { ...insObj.fieldValues };
    const layout = new WidgetLayout(insObj.layout.x, insObj.layout.y,
      insObj.layout.width, insObj.layout.height);
    return new WidgetConfig(insObj.id, widget, fieldValues, layout);
  }

  toObject(): object {
    return {
      id: this.id,
      widget: this.widget.id,
      fieldValues: this.fieldValues,
      layout: this.layout.toObject(),
    };
  }
}
