import WidgetDef from '../def/WidgetDef';
import WidgetLayout from './WidgetLayout';
import WidgetManager from '../../../WidgetManager';

export default class WidgetConfig {
  id: number;

  widget: WidgetDef;

  fieldValues: Object;

  layout: WidgetLayout;

  constructor(
    id: number,
    widget: WidgetDef,
    fieldValues: Object = {},
    layout: WidgetLayout = new WidgetLayout(0, 0, 100, 30),
  ) {
    this.id = id;
    this.widget = widget;
    this.fieldValues = fieldValues;
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
