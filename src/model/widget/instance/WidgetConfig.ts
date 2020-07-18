import WidgetDef from '../def/WidgetDef';
import WidgetLayout from './WidgetLayout';
import WidgetManager from '../../../WidgetManager';

export default class WidgetConfig {
  widget: WidgetDef;

  fieldValues: Object;

  layout: WidgetLayout;

  constructor(widget: WidgetDef, fieldValues: Object, layout: WidgetLayout) {
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
    return new WidgetConfig(widget, fieldValues, layout);
  }
}
