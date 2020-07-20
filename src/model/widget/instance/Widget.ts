import Def from '../def/Def';
import WidgetLayout from './WidgetLayout';
import WidgetManager from '../../../WidgetManager';
import Field from '../../field/Field';

export default class Widget {
  id: number;

  def: Def;

  fieldValues: object;

  layout: WidgetLayout;

  constructor(
    id: number,
    def: Def,
    fieldValues: object | undefined = undefined,
    layout: WidgetLayout = new WidgetLayout(0, 0, 200, 60),
  ) {
    this.id = id;
    this.def = def;
    if (!fieldValues) {
      const fieldValues2 = {};
      def.fields!.forEach((field: Field) => {
        fieldValues2[field.name] = field.defaultValue;
      });
      this.fieldValues = fieldValues2;
    } else {
      this.fieldValues = fieldValues;
    }
    this.layout = layout;
  }

  static fromObject(widgetObj: any, def: Def): Widget | null {
    // const defId = widgetObj.def;
    // const allDefs = WidgetManager.getAllWidgets();
    // const def = allDefs.find((d: Def) => d.id === defId);
    if (!def) {
      console.error(`Please pass in widget definition ${widgetObj.def}`);
      return null;
    }
    const fieldValues = { ...widgetObj.fieldValues };
    const layout = new WidgetLayout(widgetObj.layout.x, widgetObj.layout.y,
      widgetObj.layout.width, widgetObj.layout.height);
    return new Widget(widgetObj.id, def, fieldValues, layout);
  }

  toObject(): object {
    return {
      id: this.id,
      def: this.def.id,
      fieldValues: this.fieldValues,
      layout: this.layout.toObject(),
    };
  }

  clone(): Widget {
    return new Widget(this.id, this.def, this.fieldValues, this.layout);
  }
}
