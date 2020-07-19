class Field {
  name: string;

  label: string;

  defaultValue: string;

  constructor(name:string, label:string, defaultValue: string) {
    this.name = name;
    this.label = label;
    this.defaultValue = defaultValue;
  }
}

export default Field;
