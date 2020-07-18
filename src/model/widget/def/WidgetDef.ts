import Field from '../../field/Field';
import DropdownField, { Option } from '../../field/DropdownField';

function initFields(fsArray: Array<any>): Array<Field> {
  return fsArray.map((fieldDef: any) => {
    if (fieldDef.options) { // dropdown field
      const optObjs: Array<Option> = fieldDef.options!.map((option: any) => (
        new Option(option.id, option.name)
      ));
      return new DropdownField(fieldDef.name, fieldDef.label, optObjs);
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

  clz?: any;

  // private static instance: WidgetDef;

  constructor(WidgetClz: any) {
    const defObj = WidgetClz.settings;
    const ins = this; // new WidgetDef();
    ins.id = defObj.id;
    ins.name = defObj.name;
    ins.fields = initFields(defObj.fields);
    ins.icon = defObj.icon;
    ins.css = defObj.css;
    this.clz = WidgetClz;
    // WidgetDef.instance = ins;
  }

  // static getInstance(): WidgetDef {
  //   if (!WidgetDef.instance) {
  //     throw new Error('You forget to init this widget');
  //   }
  //   return WidgetDef.instance;
  // }
}

export default WidgetDef;
