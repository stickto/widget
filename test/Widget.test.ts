import testData from './WidgetExample';
import Widget from '../src/model/widget/def/WidgetDef';
import DropdownField, { Option } from '../src/model/field/DropdownField';

test('init widget', () => {
  const widgetData = testData.widget;
  Widget.init(widgetData);
  const ins = Widget.getInstance();
  // expect(ins).not(null);
  expect(ins.id).toBe(widgetData.id);
  expect(ins.fields?.length).toBe(2);
  const field = ins.fields![1];
  expect(field).toBeInstanceOf(DropdownField);
  const ddField = field as DropdownField;
  expect(ddField.label).toBe('Gender');
  expect(ddField.options.length).toBe(3);
  expect(ddField.options[0]).toBeInstanceOf(Option);
  const option = ddField.options![0] as Option;
  expect(option.id).toBe('male');
});
