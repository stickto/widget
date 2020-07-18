import Field from '../../field/Field';
import DropdownField from '../../field/DropdownField';

function initFields(fsArray: Array<any>): Array<Field> {
  return fsArray.map((fieldDef: any) => {
    if (fieldDef.options) { // dropdown field
      return new DropdownField(fieldDef.name, fieldDef.label, fieldDef.options);
    }
    return new Field(fieldDef.name, fieldDef.label);
  });
}

class WidgetDef {
  id?: string;

  name?: string;

  fields?: Array<Field>;

  icon?: string;

  css?: string;

  script?: string;

  private static instance: WidgetDef;

  static init(defObj: any) {
    // const defObj = JSON.parse(defString);
    const ins = new WidgetDef();
    ins.id = defObj.id;
    ins.name = defObj.name;
    ins.fields = initFields(defObj.fields);
    ins.icon = defObj.icon;
    ins.css = defObj.css;
    ins.script = defObj.script;
    WidgetDef.instance = ins;
  }

  static getInstance(): WidgetDef {
    if (!WidgetDef.instance) {
      throw new Error('You forget to init this widget');
    }
    return WidgetDef.instance;
  }
}

export default WidgetDef;
