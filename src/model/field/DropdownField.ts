import Field from './Field';

class Option {
  id: string;

  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export { Option };

class DropdownField extends Field {
  options: Array<Option>;

  constructor(name: string, label: string, defaultValue: string, options: Array<Option>) {
    super(name, label, defaultValue);
    this.options = options;
  }
}

export default DropdownField;
